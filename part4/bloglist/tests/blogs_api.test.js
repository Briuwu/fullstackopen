const mongoose = require("mongoose");
const app = require("../app");
const supertest = require("supertest");
const api = supertest(app);
const Blog = require("../models/Blog");
const User = require("../models/user");
const helper = require("./blogs_helpers");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

let token;

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({
    username: "root",
    name: "Superuser",
    passwordHash,
  });

  await user.save();

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });

  await api
    .post("/api/login")
    .send({
      username: "root",
      password: "sekret",
    })
    .expect(200);

  const newBlogsArray = helper.initialBlogs.map((blog) => ({
    ...blog,
    user: user._id,
  }));
  const blogsObject = newBlogsArray.map((blog) => new Blog(blog));
  const promiseArray = blogsObject.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe("when there is initially some blogs saved", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("a specific blog is within the returned blogs", async () => {
    const response = await api.get("/api/blogs");
    const titles = response.body.map((r) => r.title);

    expect(titles).toContain("Blog 1");
  });
});

describe("addition of a blog", () => {
  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "New blog",
      author: "New author",
      url: "New url",
      likes: 0,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `bearer ${token}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((r) => r.title);
    expect(titles).toContain("New blog");
  });

  test("adding a new blog fails with the proper statuscode 401 Unauthorized if token is missing", async () => {
    const newBlog = {
      title: "New blog",
      author: "New author",
      url: "New url",
      likes: 0,
    };

    await api.post("/api/blogs").send(newBlog).expect(401);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test("a blog without a url or title is not added", async () => {
    const newBlog = {
      author: "New author",
      likes: 0,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `bearer ${token}`)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

    const titles = blogsAtEnd.map((r) => r.title);
    expect(titles).not.toContain("New blog");
  });

  test("a blog added without likes is default to 0", async () => {
    const newBlog = {
      title: "New blog",
      author: "New author",
      url: "New url",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `bearer ${token}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const likes = blogsAtEnd.map((r) => r.likes);
    expect(likes).toContain(0);
  });
});

describe("deletion of a blog", () => {
  test("a valid blog can be deleted", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
  });
});

describe("updating a blog", () => {
  test("a valid blog can be updated", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedBlog = {
      ...blogToUpdate,
      likes: 10,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .set("Authorization", `bearer ${token}`)
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd[0].likes).toBe(10);
  });

  test("increasing likes of a blog post", async () => {
    const blogs = await helper.blogsInDb();
    const blogToUpdate = blogs[0];

    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .set("Authorization", `bearer ${token}`)
      .expect(200);

    const blogsAfterUpdate = await helper.blogsInDb();
    const updatedBlogAfterUpdate = blogsAfterUpdate.find(
      (blog) => blog.id === blogToUpdate.id
    );

    expect(updatedBlogAfterUpdate.likes).toBe(blogToUpdate.likes + 1);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
