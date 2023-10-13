import { useQuery } from "@apollo/client";
import { GET_RECOMMENDED_BOOKS, GET_USER } from "../queries";

const Recommended = () => {
  const userResult = useQuery(GET_USER);
  const result = useQuery(GET_RECOMMENDED_BOOKS);

  if (result.loading) {
    return <div>Loading...</div>;
  }

  if (!result.data) {
    return <div>No books</div>;
  }

  const recommended = result.data.recommendedBooks;

  return (
    <div>
      <h1>Recommendations</h1>
      <p>
        books in your favorite genre: <b>{userResult.data.me.favoriteGenre}</b>
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
          {recommended.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Recommended;
