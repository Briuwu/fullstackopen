import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useAnecdotes, useUpdateAnecdote } from "./hooks/use-anecdotes";
import useNotification from "./hooks/useNotification";

const App = () => {
  const { showNotification } = useNotification();
  const voteAnecdote = useUpdateAnecdote();

  const handleVote = (anecdote) => {
    voteAnecdote({ ...anecdote, votes: anecdote.votes + 1 });
    showNotification(`you voted '${anecdote.content}'`);
  };

  const { isError, error, isLoading, data } = useAnecdotes();

  if (isLoading) return <div>Loading...</div>;

  if (isError)
    return (
      <div>
        anecdote service not available due to problems in server:{" "}
        {error.message}
      </div>
    );

  const anecdotes = data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
