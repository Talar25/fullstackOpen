import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;

  const average = (good * 1 + bad * -1) / total;

  const positivePercentage = (good / total) * 100;

  function handleGood() {
    setGood((x) => x + 1);
  }

  function handleBad() {
    setBad((x) => x + 1);
  }

  function handleNeutral() {
    setNeutral((x) => x + 1);
  }

  return (
    <>
      <Feedback
        handleBad={handleBad}
        handleGood={handleGood}
        handleNeutral={handleNeutral}
      />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positivePercentage={positivePercentage}
      />
    </>
  );
};

function Feedback({ handleGood, handleNeutral, handleBad }) {
  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={handleGood}>good</Button>
      <Button onClick={handleNeutral}>neutral</Button>
      <Button onClick={handleBad}>bad</Button>
    </>
  );
}

function Statistics({
  good,
  neutral,
  bad,
  total,
  average,
  positivePercentage,
}) {
  if (!good && !neutral && !bad) {
    return <p>No feedback given</p>;
  }

  return (
    <>
      <h2>statiscits</h2>
      <table>
        <tbody>
          <StatisticLine value={good}>good</StatisticLine>
          <StatisticLine value={neutral}>neutral</StatisticLine>
          <StatisticLine value={bad}>bad</StatisticLine>
          <StatisticLine value={total}>all</StatisticLine>
          <StatisticLine value={average}>average</StatisticLine>
          <StatisticLine value={positivePercentage}>positive</StatisticLine>
        </tbody>
      </table>
    </>
  );
}

function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

function StatisticLine({ value, children }) {
  return (
    <tr>
      <td>{children}</td>
      <td>
        {value} {children === "positive" ? "%" : ""}
      </td>
    </tr>
  );
}

export default App;
