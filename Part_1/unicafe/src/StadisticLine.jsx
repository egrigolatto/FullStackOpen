import PropTypes from "prop-types";

const StadisticLine = ({ nombre, value }) => {
  return (
    <tr>
      <td>{nombre}:</td>
      <td>{value}</td>
    </tr>
  );
};
StadisticLine.propTypes = {
  nombre: PropTypes.string,
  value: PropTypes.number,
};

export default StadisticLine;
