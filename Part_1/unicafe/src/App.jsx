import { useState } from 'react';
import Button from './Button';
import Stadistics from './Stadistics';


const App = () => {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };
  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button nombre="Good" controlador={handleGoodClick} />
      <Button nombre="Neutral" controlador={handleNeutralClick} />
      <Button nombre="Bad" controlador={handleBadClick} />

      <Stadistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  );
}

export default App


