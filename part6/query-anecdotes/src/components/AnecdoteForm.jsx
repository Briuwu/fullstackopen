import { useCreateAnecdote } from "../hooks/use-anecdotes";
import useNotification from "../hooks/useNotification";

const AnecdoteForm = () => {
  const addAnecdote = useCreateAnecdote();
  const { showNotification } = useNotification();

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    addAnecdote({ content, votes: 0 });
    showNotification(`you created '${content}'`);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
