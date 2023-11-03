import PropTypes from "prop-types";

const PersonForm = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  addName
}) => {
  return (
    <form onSubmit={addName}>
      <div>
        name:{" "}
        <input
          value={newName}
          onChange={handleNameChange}
          type="text"
          required
        />{" "}
      </div>
      <br />
      <div>
        number :{" "}
        <input
          value={newNumber}
          onChange={handleNumberChange}
          type="number"
          required
        />
      </div>
      <br />

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
PersonForm.propTypes = {
  newName: PropTypes.string,
  newNumber: PropTypes.string,
  handleNameChange: PropTypes.func,
  handleNumberChange: PropTypes.func,
  addName: PropTypes.func,
};

export { PersonForm };
