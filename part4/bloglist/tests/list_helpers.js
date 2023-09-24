const _ = require("lodash");
const User = require("../models/user");

const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const mostLikes = Math.max(...blogs.map((blog) => blog.likes));

  return blogs.find((blog) => blog.likes === mostLikes);
};

const mostBlogs = (blogs) => {
  // group the blogs by author
  const groupedBlogs = _.groupBy(blogs, "author");

  // find the author with the most number of blogs
  const authorWithMostBlogs = _.maxBy(
    Object.keys(groupedBlogs),
    (author) => groupedBlogs[author].length
  );

  return {
    author: authorWithMostBlogs,
    blogs: groupedBlogs[authorWithMostBlogs].length,
  };
};

const mostLikes = (blogs) => {
  const groupedBlogs = _.groupBy(blogs, "author");
  const authorWithMostLikes = _.maxBy(Object.keys(groupedBlogs), (author) => {
    return groupedBlogs[author].reduce((totalLikes, blog) => {
      return totalLikes + blog.likes;
    }, 0);
  });

  return {
    author: authorWithMostLikes,
    likes: groupedBlogs[authorWithMostLikes].reduce((totalLikes, blog) => {
      return totalLikes + blog.likes;
    }, 0),
  };
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  usersInDb,
};
