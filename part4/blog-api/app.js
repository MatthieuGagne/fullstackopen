const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
const app = express()
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app