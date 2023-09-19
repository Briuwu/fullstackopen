import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = (good / total) * 100;

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button onRate={() => setGood(good + 1)} text="good" />
        <Button onRate={() => setNeutral(neutral + 1)} text="neutral" />
        <Button onRate={() => setBad(bad + 1)} text="bad" />
      </div>
      {good || neutral || bad ? (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={total}
          average={average}
          positive={positive}
        />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

const Button = ({ text, onRate }) => {
  return <button onClick={onRate}>{text}</button>;
};

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  return (
    <div>
      <h2>statistics</h2>

      <StatisticsLine text="good" value={good} />
      <StatisticsLine text="neutral" value={neutral} />
      <StatisticsLine text="bad" value={bad} />
      <StatisticsLine text="all" value={total} />
      <StatisticsLine text="average" value={average} />
      <StatisticsLine text="positive" value={positive} percentage />
    </div>
  );
};

const StatisticsLine = ({ text, value, percentage }) => {
  return (
    <p>
      {text}: {value}
      {percentage && "%"}
    </p>
  );
};

export default App;
