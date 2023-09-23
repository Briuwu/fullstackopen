const mongoose = require("mongoose");
const app = require("../app");
const supertest = require("supertest");
const api = supertest(app);
const Blog = require("../models/Blog");
const helper = require("./blogs_helpers");

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogsObject = helper.initialBlogs.map((blog) => new Blog(blog));
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
      title: "Blog 1",
      author: "Author 1",
      url: "https://example.com/blog1",
      likes: 10,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const contents = blogsAtEnd.map((r) => r.title);
    expect(contents).toContain("Blog 1");
  });

  test("a blog without title or url is not added", async () => {
    const newBlog = {
      author: "Author 1",
      likes: 10,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test("a blog without likes defined is defaulted 0", async () => {
    const newBlog = {
      title: "Blog 1",
      author: "Author 1",
      url: "https://example.com/blog1",
    };

    await api.post("/api/blogs").send(newBlog).expect(201);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0);
  });
});

describe("deletion of a blog", () => {
  test("a valid blog can be deleted", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

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
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd[0].likes).toBe(10);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
