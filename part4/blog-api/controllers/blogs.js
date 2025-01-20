const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

blogsRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)

  blog.save()
    .then(savedBlog => {
      response.json(savedBlog)
    })
    .catch(error => next(savedBlog))
})

module.exports = blogsRouter