import React, { useState } from 'react';

const Header = ({ name }) => <h1>{name}</h1>;

const Statistic = ({ text, value }) => {
  if (text === 'positive') {
    return <tr><td>{text} {value} %</td></tr>;
  }

  return <tr><td>{text} {value}</td></tr>;
};

const Statistics = ({ clicks }) => {
  const total = clicks.good + clicks.neutral + clicks.bad;
  const average = (clicks.good * 1 + clicks.bad * -1) / total;
  const positive = clicks.good * (100 / total);

  if (total === 0) {
    return <div>No feedback given</div>;
  }

  return (
    <div>
      <table>
        <tbody>
          <Statistic text="good" value={clicks.good} />
          <Statistic text="neutral" value={clicks.neutral} />
          <Statistic text="bad" value={clicks.bad} />
          <Statistic text="all" value={total} />
          <Statistic text="average" value={average} />
          <Statistic text="positive" value={positive} />
        </tbody>
      </table>
    </div>
  );
};

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
);

const App = () => {
  // save clicks of each button to own state
  const [clicks, setClicks] = useState({
    good: 0, neutral: 0, bad: 0
  });

  const handleButtonClick = (type) => {
    setClicks({ ...clicks, [type]: clicks[type] + 1 });
  };

  return (
    <div>
      <Header name="Customer feedback" />
      <Button onClick={() => handleButtonClick('good')} text="good" />
      <Button onClick={() => handleButtonClick('neutral')} text="neutral" />
      <Button onClick={() => handleButtonClick('bad')} text="bad" />
      <Header name="Statistics" />
      <Statistics clicks={clicks} />
    </div>
  );
};

export default App;
