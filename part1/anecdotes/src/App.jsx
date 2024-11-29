import { useState } from 'react';

const Button = (props) => (
  <button onClick={props.handleClick} className="button">
    {props.text}
  </button>
);

const App = () => {
  const initialAnecdotes = [
    { text: 'If it hurts, do it more often.', votes: 0 },
    { text: 'Adding manpower to a late software project makes it later!', votes: 0 },
    { text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0 },
    { text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 0 },
    { text: 'Premature optimization is the root of all evil.', votes: 0 },
    { text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 0 },
    { text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.', votes: 0 },
    { text: 'The only way to go fast, is to go well.', votes: 0 }
  ];

  const [anecdoteList, setAnecdoteList] = useState(initialAnecdotes);
  const [selected, setSelected] = useState(0);

  const voteUp = (index) => {
    const newAnecdotes = [...anecdoteList];
    newAnecdotes[index].votes += 1;
    setAnecdoteList(newAnecdotes);
  };

  const mostVotes = anecdoteList.reduce((mostVoted, current) => 
    current.votes > mostVoted.votes ? current : mostVoted, anecdoteList[0]);

  return (
    <div>
      <p>
      <h2>Anecdotes of the day</h2>
      {anecdoteList[selected].text}
      <br />
      has {anecdoteList[selected].votes} votes
      <br />
      <Button handleClick={() => voteUp(selected)} text="vote" />
      <Button handleClick={() => setSelected(Math.floor(Math.random() * anecdoteList.length))} text="next anecdote" />
      </p>
      <p>
      <h2>Anecdote with most votes</h2>
      {mostVotes.text}
      </p>
    </div>
  );
};

export default App