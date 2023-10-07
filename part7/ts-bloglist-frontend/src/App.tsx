import { useEffect } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import useUser from "./hooks/useUser";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import Blog from "./components/Blog";
import Users from "./components/Users";
import User from "./components/User";
import Notification from "./components/Notification";

function App() {
  const { state: user, setUser } = useUser();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  if (!user) {
    return <LoginForm />;
  }
  return (
    <div className="mx-auto max-w-7xl">
      <header>
        <Navbar />
      </header>
      <main>
        <Notification />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
