import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_BOOKS } from "../queries";
import Filter from "./Filter";

const Books = () => {
  const result = useQuery(GET_ALL_BOOKS);
  const [genre, setGenre] = useState(null);

  if (result.loading) {
    return <div>Loading...</div>;
  }

  if (!result.data) {
    return <div>No books</div>;
  }

  const genres = result.data.allBooks.reduce(
    (acc, book) => [...acc, ...book.genres],
    []
  );

  const uniqueGenres = [...new Set(genres)];

  const filteredBooks = genre
    ? result.data.allBooks.filter((b) => b.genres.includes(genre))
    : result.data.allBooks;

  return (
    <div>
      <h2>Books</h2>
      <p>
        in genre <b>{genre ? genre : "all"}</b>
      </p>
      <table>
        <thead>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Filter genres={uniqueGenres} setGenre={setGenre} />
    </div>
  );
};
export default Books;
