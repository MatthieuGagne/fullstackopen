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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}