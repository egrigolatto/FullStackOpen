const Blog = require('../models/blog')
const User = require('../models/user')



const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const initialBlogs = [
  {
    title: 'blog 1',
    author: 'emita',
    url: 'emita@gmail',
    likes: 52
  },
  {
    title: 'blog 2',
    author: 'morty',
    url: 'morty@gmail',
    likes: 100
  },
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'blog 25',
    author: 'morty',
    url: 'morty@gmail',
    likes: 100
  })

  await blog.save()
  await Blog.deleteOne({ _id: blog._id })

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}