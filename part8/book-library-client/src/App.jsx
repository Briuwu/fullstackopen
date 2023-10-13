import { Link, Route, Routes } from "react-router-dom";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import Recommended from "./components/Recommended";
function App() {
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  useEffect(() => {
    const token = localStorage.getItem("library-user-token");
    if (token) {
      setToken(token);
    }
  }, []);

  if (!token) {
    return <LoginForm setToken={setToken} />;
  }

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to={"/authors"}>authors</Link>
          </li>
          <li>
            <Link to={"/books"}>books</Link>
          </li>
          <li>
            <Link to={"/books/new"}>add book</Link>
          </li>
          <li>
            <Link to={"/recommended"}>recommended</Link>
          </li>
          <li>
            <button onClick={logout}>logout</button>
          </li>
        </ul>
      </nav>

      <main>
        <Routes>
          <Route path={"/"} element={<h2>Welcome to the bookstore</h2>} />
          <Route path={"/authors"} element={<Authors />} />
          <Route path={"/books"} element={<Books />} />
          <Route path={"/recommended"} element={<Recommended />} />
          <Route path={"/books/new"} element={<NewBook />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
