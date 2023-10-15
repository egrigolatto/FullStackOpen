import PropTypes from "prop-types";

const Button = ({ nombre, controlador }) => {
  return <button onClick={controlador}>{nombre}</button>;
};
Button.propTypes = {
  nombre: PropTypes.string, 
  controlador: PropTypes.func
};
export default Button;
