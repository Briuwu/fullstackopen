import NewAnecdote from "./components/NewAnecdote.jsx";
import Anecdotes from "./components/Anecdotes.jsx";
import Filter from "./components/Filter.jsx";
import Notification from "./components/Notification.jsx";

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <Anecdotes />
      <NewAnecdote />
    </div>
  );
};

export default App;
