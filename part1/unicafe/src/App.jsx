import './App.css'
import { useState } from 'react'

const feedbackSums = (good, neutral, bad) => {
  return good + neutral + bad
}  

const feedbackAverage = (good, neutral, bad) => {
  const sum = feedbackSums(good, neutral, bad);
  if (sum === 0) {
    return 0; // or any default value you prefer
  }
  return (good - bad) / sum;
}

const feedbackPositive = (good, neutral, bad) => {
  return ((good / feedbackSums(good, neutral, bad)) * 100).toString() + ' %'
}

const Button = (props) => (
  <button onClick={props.handleClick} className="button">
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  return (
    <tr>
    <td>{props.text}</td><td>{props.value}</td>
    </tr>
  );
}

const Statistics = (props) => {
  if (feedbackSums(props.good, props.neutral, props.bad) === 0) {
    return (
      <div>
        <table>
        <thead><tr><th>statistics</th></tr></thead>
        <tbody>
        <tr>No feedback given</tr>
        </tbody>
        </table>
      </div>
    );
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
      <tbody>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={feedbackSums(props.good, props.neutral, props.bad)} />
      <StatisticLine text="average" value={feedbackAverage(props.good, props.neutral, props.bad)} />
      <StatisticLine text="positive" value={feedbackPositive(props.good, props.neutral, props.bad)} />
      </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setFeedback = (value) => {
    console.log(value)
    if (value === 'good') {
      setGood(good + 1)
    } else if (value === 'neutral') {
      setNeutral(neutral + 1)
    } else if (value === 'bad') {
      setBad(bad + 1)
    }     
  }


  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setFeedback('good')} text="good"/>
      <Button handleClick={() => setFeedback('neutral')} text="neutral"/>
      <Button handleClick={() => setFeedback('bad')} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}/> 
    </div>
  )
}

export default App
