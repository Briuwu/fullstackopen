import { useQuery } from "@apollo/client";
import { GET_ALL_AUTHORS } from "../queries";
import EditYear from "./EditYear";

const Authors = () => {
  const result = useQuery(GET_ALL_AUTHORS);

  if (result.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>born</th>
            <th>books</th>
          </tr>
        </thead>
        <tbody>
          {result.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditYear authors={result.data.allAuthors} />
    </div>
  );
};
export default Authors;
