const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const mongoose = require("mongoose");
const userExtractor = require("../utils/middleware").userExtractor;

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    response.status(404).end();
    return;
  }

  const blog = await Blog.findById(id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body;
  const user = request.user;

  if (!title || !author || !url) {
    return response.status(400).json({
      error: "title, author and url are required",
    });
  }
  if (!user) {
    return response.status(404).json({ error: "User not found" });
  }
  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const user = request.user;
  const blogToDelete = await Blog.findById(request.params.id);

  // Verificar si el blog existe
  if (!blogToDelete) {
    return response.status(404).json({ error: "Blog not found" });
  }

  // Verificar que el usuario autenticado sea el propietario del blog
  if (blogToDelete.user.toString() !== user._id.toString()) {
    return response
      .status(403)
      .json({ error: "You do not have permission to delete this blog" });
  }

  // Eliminar el blog
  await Blog.findByIdAndDelete(request.params.id);

  // También eliminar el blog del array de blogs del usuario
  user.blogs = user.blogs.filter(
    (blogId) => blogId.toString() !== request.params.id.toString()
  );
  await user.save();

  // Responder con no contenido después de la eliminación exitosa
  response.status(204).end();
});

blogsRouter.put("/:id", userExtractor, async (request, response) => {
  const user = request.user;
  const { title, author, url, likes } = request.body;

  // Verificar que todos los campos requeridos estén presentes
  if (!title || !author || !url) {
    return response.status(400).json({ error: "All fields are required" });
  }

  const updatedBlog = {
    title,
    author,
    url,
    likes: likes || 0,
  };

  // Buscar el blog por su ID
  const blogToUpdate = await Blog.findById(request.params.id);

  if (!blogToUpdate) {
    return response.status(404).json({ error: "Blog not found" });
  }

  // Verificar si el usuario autenticado es el propietario del blog
  if (
    title !== blogToUpdate.title ||
    author !== blogToUpdate.author ||
    url !== blogToUpdate.url
  ) {
    if (blogToUpdate.user.toString() !== user._id.toString()) {
      return response
        .status(403)
        .json({ error: "You do not have permission to update this blog" });
    }
  }

  // Actualizar el blog
  const result = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, {
    new: true,
  });

  // Devolver el blog actualizado
  response.json(result);
});

module.exports = blogsRouter;
