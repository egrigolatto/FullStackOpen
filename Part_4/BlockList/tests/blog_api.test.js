const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const userExtractor = require('../utils/middleware').userExtractor

const Blog = require('../models/blog')



beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('probando si cargan los blogs ', () => { 
  test('todos los blogs retornan', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  }, 100000)
  
  test('un blog especifico dentro de los blogs devueltos', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)
    expect(contents).toContain(
      'blog 1'
    )
  }, 100000)
})


describe('viendo un blog en especifico', () => {

  test('tiene éxito con una id válido', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const body = resultBlog.body
    console.log('dobyyyyyy',body);

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(processedBlogToView)
  })
  
  
  test('falla 404 si el blog no existe', async () => {
    const validNonexistingId = await helper.nonExistingId()

    console.log(validNonexistingId)

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('falla con el código de estado 400, la identificación no es válida', async () => {
    const invalidId = '5a3d5da59070081a8'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
  
  
})

// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-

describe('Cuando inicialmente hay un usuario en db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', name:'prueba', passwordHash })

    await user.save()
  })

  test(' creación de un nuevo nombre de usuario', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'emanuel',
      name: 'emanuelito',
      password: 'morty',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

     const usersAtEnd = await helper.usersInDb()
     expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

     const usernames = usersAtEnd.map(u => u.username)
     expect(usernames).toContain(newUser.username)
  })
})


// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
/*
describe('agregando nuevos blogs', () => {

  beforeEach(async () => {
    // Limpia la base de datos antes de cada prueba, por ejemplo:
    await Blog.deleteMany({});
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('morty', 10);
    const user = new User({ username: 'root', name: 'prueba', passwordHash });

    await user.save();
  });

  test('crear un nuevo blog exitoso', async () => {
    const usersAtStart = await helper.usersInDb();

    const loginResponse = await api
      .post('/api/login')
      .send({
        username: 'root',
        password: 'morty',
      })
      .expect(200);

    const token = loginResponse.body.token;

    const newBlog = {
      title: 'Nuevo Blog',
      author: 'Autor',
      url: 'http://example.com',
      likes: 10,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogs = await Blog.find({});
    expect(blogs).toHaveLength(1);

    const blog = blogs[0];
    expect(blog.title).toBe('Nuevo Blog');
    expect(blog.author).toBe('Autor');
    expect(blog.url).toBe('http://example.com');
    expect(blog.likes).toBe(10);
    // expect(blog.user.toString()).toBe(usersAtStart[0]._id.toString());
  }, 100000);


})
*/

// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
/*
describe('eliminado blogs', () => {
  beforeEach(async () => {
    
    await Blog.deleteMany({});
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'root', name: 'prueba', passwordHash });

    await user.save();
  });

  test('eliminar un blog exitoso', async () => {
    const loginResponse = await api
      .post('/api/login')
      .send({
        username: 'root',
        password: 'sekret',
      })
      .expect(200);

    const token = loginResponse.body.token;

    const newBlog = {
      title: 'Blog a Eliminar',
      author: 'Autor',
      url: 'http://example.com',
      likes: 5,
    };

    // Crea un nuevo blog
    const createResponse = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201);

    const blogId = createResponse.body._id;

    // Intenta eliminar el blog
    await api
      .delete(`/api/blogs/${blogId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    // Verifica que el blog haya sido eliminado
    const blogsAfterDeletion = await Blog.find({});
    expect(blogsAfterDeletion).toHaveLength(0);

    // Verifica que el blog haya sido eliminado del array de blogs del usuario
    const user = await User.findOne({ username: 'root' });
    expect(user.blogs).toHaveLength(0);
  }, 100000);
 })

/*
describe('agregando nuevos blogs', () => { 

  test('se puede agregar un blog valido', async () => {
    const newBlog = {
      title: 'blog 10',
      author: 'morty',
      url: 'morty@gmail',
      likes: 100,
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    // se llama de nuevo a los blog y debe tener 1 mas
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    const contents = blogsAtEnd.map(n => n.title)
    expect(contents).toContain(
      'blog 10')
  }, 100000)

  test('verificar que tenga contenido la nota', async () => {
    const newBlog = {

      author: 'blog 11',
      url: 'morty@gmail',
      likes: 100
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  }, 100000)

  test('Verificar que los blog tenga la propiedad id creada en la db', async () => {

    const newBlog = {
      title: 'blog 30',
      author: 'morty',
      url: 'morty@gmail',
      likes: 100
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blog = await helper.blogsInDb()

    blog.map(blog => expect(blog.id).toBeDefined())

  })

  test('Verificar que likes por defecto sea 0', async () => {

    const newBlog = {
      title: 'blog_sin_likes',
      author: 'mortyS',
      url: 'morty@gmail',

    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    const specificBlog = blogs.find(blog => blog.title === 'blog_sin_likes')

    expect(specificBlog.likes).toBeDefined()
    expect(specificBlog.likes).toBe(0)
  })

})

describe('eliminando un blog', () => {
  test('tiene éxito con el código de estado 204 si la identificación es válida', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    // const contents = notesAtEnd.map(r => r.content)

    // expect(contents).not.toContain(noteToDelete.content)
  })
})



*/

describe('Operaciones de blogs', () => {
  let token;

  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'root', name: 'prueba', passwordHash });

    await user.save();

    // Inicia sesión y obtén el token para todas las pruebas
    const loginResponse = await api
      .post('/api/login')
      .send({
        username: 'root',
        password: 'sekret',
      })
      .expect(200);

    token = loginResponse.body.token;
  });

  test('crear y eliminar un blog', async () => {
    const newBlog = {
      title: 'Blog de prueba',
      author: 'Autor',
      url: 'http://example.com',
      likes: 5,
    };

    // Crea un nuevo blog
    const createResponse = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201);
    
   

    const blogId = createResponse.body.id;

    // Verifica que el blog haya sido creado
    const blogsAfterCreation = await Blog.find({});
    expect(blogsAfterCreation).toHaveLength(1);

    // Elimina el blog recién creado
    await api
      .delete(`/api/blogs/${blogId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    // Verifica que el blog haya sido eliminado
    const blogsAfterDeletion = await Blog.find({});
    expect(blogsAfterDeletion).toHaveLength(0);
  });
});





afterAll(() => {
  console.log('Conexion test cerrada')
  mongoose.connection.close()
})