import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const randomNumber = Math.floor(Math.random() * anecdotes.length);

  const handleVote = () => {
    setVotes(votes.map((vote, i) => (i === selected ? vote + 1 : vote)));
  };

  const highestVote = Math.max(...votes);

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button text="vote" onClick={handleVote} />
      <Button text="next anecdote" onClick={() => setSelected(randomNumber)} />
      <MostVotes
        anecdotes={anecdotes[votes.indexOf(highestVote)]}
        highestVote={highestVote}
      />
    </div>
  );
};

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const MostVotes = ({ anecdotes, highestVote }) => {
  if (!highestVote) {
    return <p>No votes</p>;
  }

  return (
    <>
      <h1>Anecdotes with most votes</h1>
      <p>{anecdotes}</p>
    </>
  );
};

export default App;
