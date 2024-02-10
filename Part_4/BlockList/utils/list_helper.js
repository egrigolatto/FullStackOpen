
const blogsArray = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

const dummy = (blogs) => {
  // ...
  return 1
  
}
const totalLikes = (blogs) => {
   
  return blogs[0].likes

}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null 
  }
  // Inicializa el blog favorito con el primer blog del array
  let blogFavorito = blogs[0]

  for (let i = 1; i < blogs.length; i++) {
    if (blogs[i].likes > blogFavorito.likes) {
      blogFavorito = blogs[i]
    }
  }
  return {
    title: blogFavorito.title,
    author: blogFavorito.author,
    likes: blogFavorito.likes,
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  // seguimiento de la cantidad de blogs por autor
  const blogsPorAutor = {}


  // Recorrer los blogs y contar la cantidad de blogs por autor
  blogs.forEach((blog) => {
    const author = blog.author
    blogsPorAutor[author] = (blogsPorAutor[author] || 0) + 1
  })


  // Encontrar al autor con la mayor cantidad de blogs
  let autorConMasBlogs = null
  let cantidadDeBlogs = 0

  Object.keys(blogsPorAutor).forEach((author) => {
    if (blogsPorAutor[author] > cantidadDeBlogs) {
      autorConMasBlogs = author
      cantidadDeBlogs = blogsPorAutor[author]
    }
  })

  // Retornar un objeto con el autor y la cantidad de blogs
  return {
    author: autorConMasBlogs,
    blogs: cantidadDeBlogs,
  }

}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null 
  }

  //  para realizar un seguimiento de los likes por autor
  const likesPorAutor = {}

  // Recorrer los blogs y contar la cantidad de likes por cada autor
  blogs.forEach((blog) => {
    const author = blog.author
    likesPorAutor[author] = (likesPorAutor[author] || 0) + blog.likes
  })

  // autor con la mayor cantidad total de likes
  let autorConMasLikes = null
  let totalDeLikes = 0

  Object.keys(likesPorAutor).forEach((author) => {
    if (likesPorAutor[author] > totalDeLikes) {
      autorConMasLikes = author
      totalDeLikes = likesPorAutor[author]
    }
  })

  return {
    author: autorConMasLikes,
    likes: totalDeLikes,
  }
}





module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}