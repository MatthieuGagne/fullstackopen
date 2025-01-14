const express = require('express')
const app = express()

app.use(express.static('dist'))

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

const morgan = require('morgan')
// Custom token to log request body
morgan.token('body', (req) => JSON.stringify(req.body))
// Custom format that includes the body for POST requests
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const cors = require('cors')
app.use(cors())

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
        },
        { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
        },
        { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
        },
        { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
        }
]

app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    const date = new Date();
    response.send(`Phonebook has info for ${persons.length} people <br> ${date.toString()}`)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    console.log('Person not found !')
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const generateId = () => Math.floor(Math.random() * 100000);

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  } else if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({ 
      error: 'person already exist' 
    })
  } else if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }
  
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)

  response.json(person)

})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})