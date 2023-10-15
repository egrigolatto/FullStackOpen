import StadisticLine from "./StadisticLine";
import PropTypes from "prop-types";

const Stadistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good / all)*100;

  if (good == 0 && neutral == 0 && bad == 0) {
    return <p>No feedback given</p>;
  } else {
    return (
      <div>
        <h1>Stadistics</h1>
        <table>
          <tbody>
            <StadisticLine nombre="Good" value={good} />
            <StadisticLine nombre="Neutral" value={neutral} />
            <StadisticLine nombre="Bad" value={bad} />
            <tr>
              <td>all:</td>
              <td>{isNaN(all) ? 0 : all}</td>
            </tr>
            <tr>
              <td>average:</td>
              <td>{isNaN(average) ? 0 : average}</td>
            </tr>
            <tr>
              <td>positive:</td>
              <td>{isNaN(positive) ? 0 : positive}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
};
Stadistics.propTypes = {
  good: PropTypes.number,
  neutral: PropTypes.number,
  bad: PropTypes.number
};
export default Stadistics