import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import CreateBlog from "./components/CreateBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import UserForm from "./components/UserForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });

  const blogFormRef = useRef();

  const handleNotification = (message, type) => {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification({ message: null, type: null });
    }, 5000);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      const initialBlog = await blogService.getAll();
      setBlogs(initialBlog);
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setPassword("");
      setUsername("");
      handleNotification(`${user.name} logged in`, "success");
    } catch (exception) {
      console.log(exception);
      handleNotification("wrong username or password", "error");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const createBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();
      const newBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(newBlog));
      handleNotification(
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
        "success"
      );
    } catch (exception) {
      console.log(exception);
      handleNotification("error creating blog", "error");
    }
  };

  const updateBlog = async (blogObject, id) => {
    try {
      const updatedBlog = await blogService.update(id, blogObject);
      setBlogs(blogs.map((blog) => (blog.id === id ? updatedBlog : blog)));
    } catch (exception) {
      console.log(exception);
      handleNotification("error updating blog", "error");
    }
  };

  const removeBlog = async (id) => {
    try {
      await blogService.remove(id);
      const blogTitle = blogs.find((blog) => blog.id === id).title;
      setBlogs(blogs.filter((blog) => blog.id !== id));
      handleNotification(`Blog ${blogTitle} removed`, "success");
    } catch (exception) {
      console.log(exception);
      handleNotification("error removing blog", "error");
    }
  };

  const userLoginForm = () => (
    <Togglable buttonLabel="login">
      <UserForm
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
    </Togglable>
  );

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={notification.message} type={notification.type} />
        {userLoginForm()}
      </div>
    );
  }

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <div>
        <h2>blogs</h2>
        <Notification message={notification.message} type={notification.type} />
        <p>
          {user.name} logged in{" "}
          <button onClick={handleLogout} id="logout-button">
            logout
          </button>
        </p>
        <Togglable buttonLabel={"create"} ref={blogFormRef}>
          <CreateBlog createBlog={createBlog} />
        </Togglable>
        <div className="blog">
          {sortedBlogs.map((blog) => {
            return (
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={updateBlog}
                removeBlog={removeBlog}
                currentUser={user.username}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
