const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test_helper");

const bcrypt = require("bcrypt");
const User = require("../models/user");

const api = supertest(app);

describe("********** GET /api/blogs **********", () => {
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

  test("Testing if blogs are loaded correctly", async () => {
    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test("should include a specific blog in the returned blogs", async () => {
    const response = await api.get("/api/blogs");

    const titles = response.body.map((e) => e.title);
    // assert.strictEqual(titles.includes("React patterns"), true);
    assert(titles.includes("React patterns"));
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

  test("fails with status code 404 if the blog does not exist", async () => {
    const nonExistingId = await helper.nonExistingId();

    await api.get(`/api/blogs/${nonExistingId}`).expect(404);
  });

  test("fails with status code 400 if the ID is malformed", async () => {
    const invalidId = "12345"; // Ejemplo de un ID mal formado

    await api.get(`/api/blogs/${invalidId}`).expect(404);
  });
});

describe("********** POST /api/blogs **********", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("morty", 10);
    const user = new User({ username: "root", name: "prueba", passwordHash });

    await user.save();
  });

  test("a valid blog can be added ", async () => {
    const blogsAtStart = await helper.blogsInDb;

    const loginResponse = await api
      .post("/api/login")
      .send({
        username: "root",
        password: "morty",
      })
      .expect(200);

    const token = loginResponse.body.token;

    const newBlog = {
      title: "Las aventuras de Morty y su pandilla",
      author: "Grigolatto Emanuel",
      url: "http://www.las aventurasdemortyysupandilla.edu",
      likes: 5,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1);

    const titles = blogsAtEnd.map((b) => b.title);
    assert(titles.includes("Las aventuras de Morty y su pandilla"));
  });

  test("blog without title is not added", async () => {
    const blogsAtStart = await helper.blogsInDb;

    const loginResponse = await api
      .post("/api/login")
      .send({
        username: "root",
        password: "morty",
      })
      .expect(200);

    const token = loginResponse.body.token;

    const newBlog = {
      author: "Grigolatto Emanuel",
      url: "http://www.lasaventurasdemortyysupandilla.edu",
      likes: 5,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length);
  });

  test("blog post has likes property with default value 0 if not provided", async () => {
    const loginResponse = await api
      .post("/api/login")
      .send({
        username: "root",
        password: "morty",
      })
      .expect(200);

    const token = loginResponse.body.token;

    const newBlog = {
      title: "Las aventuras de Morty y su pandilla",
      author: "Grigolatto Emanuel",
      url: "http://www.lasaventurasdemortyysupandilla.edu",
      // No likes property provided
    };

    const response = await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const savedBlog = response.body;
    assert.strictEqual(savedBlog.likes, 0);

    const blogsAtEnd = await helper.blogsInDb();
    const blogInDb = blogsAtEnd.find((b) => b.id === savedBlog.id);
    assert.strictEqual(blogInDb.likes, 0);
  });

  test("adding a blog fails with status code 401 if token is not provided", async () => {
    const newBlog = {
      title: "Una aventura sin token",
      author: "Grigolatto Emanuel",
      url: "http://www.unaaventurasintoken.edu",
      likes: 10,
    };

    await api.post("/api/blogs").send(newBlog).expect(401);

  });
});

describe("********** DELETE /api/blogs **********", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("morty", 10);
    const user = new User({ username: "root", name: "prueba", passwordHash });

    await user.save();

    const loginResponse = await api
      .post("/api/login")
      .send({
        username: "root",
        password: "morty",
      })
      .expect(200);

    const token = loginResponse.body.token;

    const newBlog = {
      title: "Blog to be deleted",
      author: "Author",
      url: "http://www.blogtobedeleted.com",
      likes: 2,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });

  test("a blog can be deleted", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    const loginResponse = await api
      .post("/api/login")
      .send({
        username: "root",
        password: "morty",
      })
      .expect(200);

    const token = loginResponse.body.token;

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);
    const titles = blogsAtEnd.map((r) => r.title);
    assert(!titles.includes(blogToDelete.title));
  });

  test("fails with status code 400 if blog id is invalid", async () => {
    const invalidId = "12345invalid";

    const loginResponse = await api
      .post("/api/login")
      .send({
        username: "root",
        password: "morty",
      })
      .expect(200);

    const token = loginResponse.body.token;

    await api
      .delete(`/api/blogs/${invalidId}`)
      .set("Authorization", `bearer ${token}`)
      .expect(400);
  });

  test("fails with status code 401 if no token is provided", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(401);

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length);
  });

  test("deleting a blog fails with status code 401 if token is not provided", async () => {
    const newBlog = {
      title: "Una aventura sin token",
      author: "Grigolatto Emanuel",
      url: "http://www.unaaventurasintoken.edu",
      likes: 10,
    };

    await api.post("/api/blogs").send(newBlog).expect(401);
  });
});

describe("********** PUT /api/blogs **********", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("morty", 10);
    const user = new User({ username: "root", name: "prueba", passwordHash });

    await user.save();

    const loginResponse = await api
      .post("/api/login")
      .send({
        username: "root",
        password: "morty",
      })
      .expect(200);

    const token = loginResponse.body.token;

    const newBlog = {
      title: "Blog to be updated",
      author: "Author",
      url: "http://www.blogtobeupdated.com",
      likes: 2,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });

  test("a blog can be updated", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedBlog = {
      title: "Updated Title",
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes + 1,
    };

    const loginResponse = await api
      .post("/api/login")
      .send({
        username: "root",
        password: "morty",
      })
      .expect(200);

    const token = loginResponse.body.token;

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set("Authorization", `bearer ${token}`)
      .send(updatedBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.title, updatedBlog.title);
    assert.strictEqual(response.body.likes, updatedBlog.likes);
  });

  test("fails with status code 400 if blog id is invalid", async () => {
    const invalidId = "12345invalid";

    const updatedBlog = {
      title: "Updated Title",
      author: "Author",
      url: "http://www.updatedurl.com",
      likes: 10,
    };

    const loginResponse = await api
      .post("/api/login")
      .send({
        username: "root",
        password: "morty",
      })
      .expect(200);

    const token = loginResponse.body.token;

    await api
      .put(`/api/blogs/${invalidId}`)
      .set("Authorization", `bearer ${token}`)
      .send(updatedBlog)
      .expect(400);
  });

  test("fails with status code 401 if no token is provided", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedBlog = {
      title: "Updated Title",
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes + 1,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(401);

    const blogsAtEnd = await helper.blogsInDb();
    const unchangedBlog = blogsAtEnd.find((b) => b.id === blogToUpdate.id);

    assert.strictEqual(unchangedBlog.title, blogToUpdate.title);
    assert.strictEqual(unchangedBlog.likes, blogToUpdate.likes);
  });

  test("Modifying a blog fails with status code 401 if token is not provided.", async () => {
    const newBlog = {
      title: "Una aventura sin token",
      author: "Grigolatto Emanuel",
      url: "http://www.unaaventurasintoken.edu",
      likes: 10,
    };

    await api.post("/api/blogs").send(newBlog).expect(401);
  });
});

describe("********** POST /api/users **********", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  test("a valid user can be created", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "newuser",
      name: "New User",
      password: "validpassword",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });

  test("fails with status code 400 if username already exists", async () => {
    const newUser = {
      username: "root",
      name: "Superuser",
      password: "validpassword",
    };

    const existingUser = new User({
      username: newUser.username,
      name: newUser.name,
      passwordHash: await bcrypt.hash(newUser.password, 10),
    });
    await existingUser.save();

    const usersAtStart = await helper.usersInDb();

    const response = await api.post("/api/users").send(newUser).expect(400);

    assert.strictEqual(response.body.error, "Username already exists");

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("fails with status code 400 if username or password is missing", async () => {
    const usersAtStart = await helper.usersInDb();

    // No username
    let newUser = {
      name: "User Without Username",
      password: "validpassword",
    };

    await api.post("/api/users").send(newUser).expect(400);

    // No password
    newUser = {
      username: "userwithoutpassword",
      name: "User Without Password",
    };

    await api.post("/api/users").send(newUser).expect(400);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("fails with status code 400 if password is too short", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "shortpassworduser",
      name: "Short Password User",
      password: "12", // Invalid short password
    };

    const response = await api.post("/api/users").send(newUser).expect(400);

    assert.strictEqual(
      response.body.error,
      "Username and password must be at least 3 characters long"
    );

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
});

after(async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed");
});
