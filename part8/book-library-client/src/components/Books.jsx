import { useQuery } from "@apollo/client";
import { GET_ALL_BOOKS } from "../queries";

const Books = () => {
  const result = useQuery(GET_ALL_BOOKS);

  if (result.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Books</h2>
      <table>
        <thead>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {result.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Books;
