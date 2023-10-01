import { useEffect } from "react";
import NewAnecdote from "./components/NewAnecdote.jsx";
import Anecdotes from "./components/Anecdotes.jsx";
import Filter from "./components/Filter.jsx";
import Notification from "./components/Notification.jsx";
import { useDispatch } from "react-redux";
import { initializeAnecdotes } from "./reducers/anecdoteReducer.js";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

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
