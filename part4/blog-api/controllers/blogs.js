const blogsRouter = require('express').Router()
const logger = require('../utils/logger')

blogsRouter.get('/', (request, response) => {
  logger.info('Ping!')
  response.send('Hello')
})

blogsRouter.post('/', (request, response) => {
  logger.info('P0ng!')
  response.send('Paclow !')
})

module.exports = blogsRouter