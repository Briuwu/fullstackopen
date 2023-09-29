import { useState } from "react";

const Blog = ({ blog, updateBlog, removeBlog, currentUser }) => {
  const [view, setView] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const isUser = blog.user.username === currentUser;

  const increaseLike = (id) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };

    updateBlog(updatedBlog, id);
  };

  const remove = (id) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(id);
    }
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{" "}
        <button onClick={() => setView(!view)}>{view ? "hide" : "view"}</button>
      </div>
      {view && (
        <div className="viewBlog">
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}{" "}
            <button onClick={() => increaseLike(blog.id)}>like</button>
          </div>
          <div>{blog.author}</div>
          {isUser && <button onClick={() => remove(blog.id)}>remove</button>}
        </div>
      )}
    </div>
  );
};

export default Blog;
