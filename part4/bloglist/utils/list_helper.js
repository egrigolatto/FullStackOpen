const _ = require("lodash");

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map((blog) => blog.likes));
  const favorite = blogs.find((blog) => blog.likes === maxLikes);
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

const mostBlogs = (blogs) => {
  const authors = _.groupBy(blogs, "author");
  const mostBlogsAuthor = _.maxBy(
    Object.keys(authors),
    (author) => authors[author].length
  );
  return {
    author: mostBlogsAuthor,
    blogs: authors[mostBlogsAuthor].length,
  };
};

const mostLikes = (blogs) => {
  const likesByAuthor = _.groupBy(blogs, "author");
  const likesCount = _.mapValues(likesByAuthor, (blogs) =>
    _.sumBy(blogs, "likes")
  );
  const mostLikesAuthor = _.maxBy(
    Object.keys(likesCount),
    (author) => likesCount[author]
  );
  return {
    author: mostLikesAuthor,
    likes: likesCount[mostLikesAuthor],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
