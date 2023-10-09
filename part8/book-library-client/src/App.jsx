import { Link, Route, Routes } from "react-router-dom";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

function App() {
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
        </ul>
      </nav>

      <main>
        <Routes>
          <Route path={"/"} element={<h2>Welcome to the bookstore</h2>} />
          <Route path={"/authors"} element={<Authors />} />
          <Route path={"/books"} element={<Books />} />
          <Route path={"/books/new"} element={<NewBook />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
