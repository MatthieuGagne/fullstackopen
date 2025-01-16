const express = require('express')
const app = express()
const dotenv = require('dotenv')

// Load environment variables from .env file
dotenv.config()

app.use(express.json())

app.use(express.static('dist'))

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }

app.use(requestLogger)

const cors = require('cors')
app.use(cors())

const mongoose = require('mongoose')

const url = process.env.MONGODB_URI;

console.log(url)

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

app.get('/', (request, response) => {
response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response) => {
const id = request.params.id
const note = notes.find(note => note.id === id)
if (note) {
    response.json(note)
    } else {
    response.status(404).end()
    }  })

app.delete('/api/notes/:id', (request, response) => {
const id = request.params.id
notes = notes.filter(note => note.id !== id)

response.status(204).end()
})

const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => Number(n.id)))
      : 0
    return String(maxId + 1)
}
  
app.post('/api/notes', (request, response) => {
const body = request.body

if (!body.content) {
    return response.status(400).json({ 
    error: 'content missing' 
    })
}

const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
}

notes = notes.concat(note)

response.json(note)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)

const PORT = 3000
app.listen(PORT)
console.log(`Server running on port ${PORT}`)