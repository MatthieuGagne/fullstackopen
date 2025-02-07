const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

describe('Blog API', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  describe('when there are initially some blogs saved', () => {
    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('there are 6 blogs', async () => {
      const response = await api.get('/api/blogs')
      assert.strictEqual(response.body.length, 6)
    })

    test('blog posts have id as the unique identifier', async () => {
      const response = await api.get('/api/blogs')
      const blog = response.body[0]
      assert(blog.id)
      assert(!blog._id)
    })
  })

  describe('addition of a new blog', () => {
    test('a valid blog can be added', async () => {
      const newBlog = {
        title: 'Test Blog',
        author: 'Test Author',
        url: 'http://testblog.com',
        likes: 0
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map(b => b.title)
      assert(titles.includes('Test Blog'))
    })

    test('if likes property is missing, it defaults to 0', async () => {
      const newBlog = {
        title: 'Test Blog Without Likes',
        author: 'Test Author',
        url: 'http://testblog.com'
      }

      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.likes, 0)
    })

    test('backend responds with 400 Bad Request if title is missing', async () => {
      const newBlog = {
        author: 'Test Author',
        url: 'http://testblog.com',
        likes: 0
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })

    test('backend responds with 400 Bad Request if url is missing', async () => {
      const newBlog = {
        title: 'Test Blog',
        author: 'Test Author',
        likes: 0
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

      const titles = blogsAtEnd.map(b => b.title)
      assert(!titles.includes(blogToDelete.title))
    })

    test('fails with status code 404 if blog does not exist', async () => {
      const nonExistingId = await helper.nonExistingId()
      await api
        .delete(`/api/blogs/${nonExistingId}`)
        .expect(404)
    })

    test('fails with status code 400 if id is invalid', async () => {
      await api
        .delete('/api/blogs/invalidid')
        .expect(400)
    })
  })

  describe('updating a blog', () => {
    test('succeeds with valid data', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const updatedBlog = {
        ...blogToUpdate,
        title: 'Updated Title',
        likes: blogToUpdate.likes + 1
      }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      const updatedBlogInDb = blogsAtEnd.find(b => b.id === blogToUpdate.id)

      assert.strictEqual(updatedBlogInDb.title, 'Updated Title')
      assert.strictEqual(updatedBlogInDb.likes, blogToUpdate.likes + 1)
    })

    test('fails with status code 400 if likes is not a number', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const updatedBlog = {
        ...blogToUpdate,
        likes: 'not a number'
      }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(400)
    })

    test('fails with status code 404 if blog does not exist', async () => {
      const nonExistingId = await helper.nonExistingId()
      const updatedBlog = {
        title: 'This Should Not Be Updated',
        author: 'Non-existent Author',
        url: 'http://non-existent.com',
        likes: 0
      }

      await api
        .put(`/api/blogs/${nonExistingId}`)
        .send(updatedBlog)
        .expect(404)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
