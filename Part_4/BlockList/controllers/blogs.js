const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const userExtractor = require('../utils/middleware').userExtractor

// si no quisiera usar try/catch puedo instalar npm install express-async-errors que elimina el try/catch y por ende next
// en app.js -> require('express-async-errors')

// const getTokenFrom = (request) => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7)
//   }
//   return null
// }

blogsRouter.get('/', async (request, response, next) => {

  try {
    const blogs = await Blog
      // .find({})
      .find({}).populate('user')
    response.json(blogs)
  } catch (error) {
    next(error)
  }
  
})

blogsRouter.get('/:id', async (request, response, next) => {

  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})


blogsRouter.post('/', userExtractor, async (request, response, next) => {

  const { title, author, url, likes } = request.body;
  const user = request.user

  if (!title || !author || !url) {
    return response.status(400).json({ error: 'Todos los campos son requeridos' })
  }
  if (!user) {
    return response.status(404).json({ error: 'Usuario no encontrado' });
  }

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes || 0,
    user: user._id
  })


  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id',userExtractor, async (request, response, next) => {
  const user = request.user;

  try {
    const blogToDelete = await Blog.findById(request.params.id);

    if (!blogToDelete) {
      return response.status(404).json({ error: 'Blog no encontrado' });
    }

    // Verificar que el usuario autenticado sea el propietario del blog
    if (blogToDelete.user.toString() !== user._id.toString()) {
      return response.status(403).json({ error: 'No tienes permisos para eliminar este blog' });
    }

    // Almacenar el blog antes de eliminarlo
    const deletedBlog = await Blog.findByIdAndDelete(request.params.id);

    // También elimina el blog del array de blogs del usuario
    user.blogs = user.blogs.filter(blogId => blogId.toString() !== request.params.id.toString());
    await user.save();

    // Devolver el blog eliminado
    // si le pongo 200 me devuelve el blog 
    response.status(204).end()
  } catch (error) {
    next(error);
  }
})

blogsRouter.put('/:id', userExtractor, async (request, response, next) => {
  const user = request.user;
  const { title, author, url, likes } = request.body;

  if (!title || !author || !url) {
    return response.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  const updatedBlog = {
    title,
    author,
    url,
    likes: likes || 0,
  };

  try {
    // Buscar el blog por su ID
    const blogToUpdate = await Blog.findById(request.params.id);

    if (!blogToUpdate) {
      return response.status(404).json({ error: 'Blog no encontrado' });
    }

    if (title !== blogToUpdate.title || author !== blogToUpdate.author || url !== blogToUpdate.url) {
      // Verificar que el usuario autenticado sea el propietario del blog
      if (blogToUpdate.user.toString() !== user._id.toString()) {
        return response.status(403).json({ error: 'No tienes permisos para actualizar este blog' });
      }
    }
   

    // Actualizar el blog
    const result = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true });

    response.json(result);
  } catch (error) {
    // Manejo de errores
    next(error);
  }
});


module.exports = blogsRouter