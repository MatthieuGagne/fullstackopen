const maxBy = require('lodash.maxBy')
const countBy = require('lodash.countBy')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const { title, author, likes } = blogs.reduce((favorite, blog) => blog.likes > favorite.likes ? blog : favorite, blogs[0])
  return { title, author, likes }
}

const authorWithMostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null
  }
  const authorCounts = countBy(blogs, 'author')
  const maxAuthor = maxBy(Object.keys(authorCounts), (author) => authorCounts[author])
  return {
    author: maxAuthor,
    blogs: authorCounts[maxAuthor]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  authorWithMostBlogs
}