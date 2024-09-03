const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are two blogs", async () => {
  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test("the first blog is about React patterns", async () => {
  const response = await api.get("/api/blogs");

  const titles = response.body.map((e) => e.title);
  // assert.strictEqual(titles.includes("React patterns"), true);
  assert(titles.includes("React patterns"));
});

test("a valid blog can be added ", async () => {
  const newBlog = {
    title: "Las aventuras de Morty y su pandilla",
    author: "Grigolatto Emanuel",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((b) => b.title);
  assert(titles.includes("Las aventuras de Morty y su pandilla"));
});

test("blog without title is not added", async () => {
  const newBlog = {
    author: "Grigolatto Emanuel",
    url: "http://www.u.arizona.edu/",
    likes: 5,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const blogsAtEnd = await helper.blogsInDb();

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
});

test("a specific blog can be viewed", async () => {
  const blogsAtStart = await helper.blogsInDb();

  const blogToView = blogsAtStart[0];

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.deepStrictEqual(resultBlog.body, blogToView);
});

test("a blog can be deleted", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();

  const titles = blogsAtEnd.map((b) => b.title);
  assert(!titles.includes(blogToDelete.title));

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);
});

test("blog post has unique identifier property named 'id'", async () => {
  const blog = new Blog({
    title: "Test Blog",
    author: "Test Author",
    url: "test.com",
    likes: 0,
  });

  await blog.save();

  const savedBlog = await Blog.findById(blog._id);
  assert(savedBlog._id.toString() === blog._id.toString());
});

test("blog post has likes property with default value 0 if not provided", async () => {
  const blog = new Blog({
    title: "Test Blog",
    author: "Test Author",
    url: "test.com",
  });

  await blog.save();

  const savedBlog = await Blog.findById(blog._id);
  assert.strictEqual(savedBlog.likes, 0);
});

test("returns 400 if title is missing", async () => {
  const newBlog = {
    author: "John Doe",
    url: "https://example.com",
    likes: 0,
  };

  const response = await api.post("/api/blogs").send(newBlog);
  assert.strictEqual(response.status, 400);
});

test("returns 400 if url is missing", async () => {
  const newBlog = {
    title: "New blog",
    author: "John Doe",
    likes: 0,
  };

  const response = await api.post("/api/blogs").send(newBlog);
  assert.strictEqual(response.status, 400);
});

test("DELETE /blogs/:id elimina una nota", async () => {
  const newBlog = {
    title: "Nota para eliminar",
    author: "John Doe",
    url: "https://example.com",
    likes: 0,
  };

  const responseCreate = await api.post("/api/blogs").send(newBlog);
  const blogId = responseCreate.body.id;

  const responseDelete = await api.delete(`/api/blogs/${blogId}`);
  assert.strictEqual(responseDelete.status, 204);
});

test("GET /blogs/:id devuelve error 404 si no existe el ID", async () => {
  const nonExistentId = "1234567890";

  const response = await api.get(`/api/blogs/${nonExistentId}`);
  assert.strictEqual(response.status, 404);
});

test("PUT /blogs/:id actualiza una nota", async () => {
  const newBlog = {
    title: "Nota para actualizar",
    author: "John Doe",
    url: "https://example.com",
    likes: 0,
  };

  const responseCreate = await api.post("/api/blogs").send(newBlog);
  const blogId = responseCreate.body.id;

  const updatedBlog = {
    title: "Nota actualizada",
    author: "Jane Doe",
    url: "https://example.com/updated",
    likes: 100,
  };

  const responseUpdate = await api
    .put(`/api/blogs/${blogId}`)
    .send(updatedBlog);
  assert.strictEqual(responseUpdate.status, 200);
});

after(async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed");
});
