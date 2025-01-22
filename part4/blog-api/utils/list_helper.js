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
  if (!blogs || blogs.length === 0) {
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

/**
 * Returns the author with the most likes from a list of blogs.
 *
 * @param {Array} blogs - An array of blog objects.
 * @returns {Object|null} An object with 'author' and 'likes' properties, or null if the input array is empty.
 *
 * The function works as follows:
 * 1. It uses the reduce method to create an object (likesByAuthor) where the keys are author names and the values are the sum of likes for each author.
 *    - The reduce method iterates over each blog in the blogs array.
 *    - For each blog, it checks if the author already exists in the likesByAuthor object.
 *    - If the author exists, it adds the current blog's likes to the existing value.
 *    - If the author does not exist, it initializes the author's likes with the current blog's likes.
 * 2. It finds the author with the maximum likes using the maxBy function.
 * 3. It returns an object containing the author with the most likes and the total number of likes.
 */
const authorWithMostLikes = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null
  }
  const likesByAuthor = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + blog.likes
    return acc
  }, {})
  const maxAuthor = maxBy(Object.keys(likesByAuthor), (author) => likesByAuthor[author])
  return {
    author: maxAuthor,
    likes: likesByAuthor[maxAuthor]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  authorWithMostBlogs,
  authorWithMostLikes
}