import { useSelector, useDispatch } from "react-redux";
import { updateAnecdote } from "../reducers/anecdoteReducer";
import { displayNotification } from "../reducers/notificationReducer";

const Anecdotes = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === "") return anecdotes;

    return anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    );
  });

  const vote = async (id) => {
    const anecdote = anecdotes.find((anecdote) => anecdote.id === id);
    dispatch(
      updateAnecdote(id, {
        ...anecdote,
        votes: anecdote.votes + 1,
      })
    );
    dispatch(displayNotification(`you voted '${anecdote.content}'`, 5));
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};
export default Anecdotes;
