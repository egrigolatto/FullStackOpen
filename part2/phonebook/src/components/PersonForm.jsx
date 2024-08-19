
const PersonForm = ({newName, newNumber, handleNameChange, handleNumberChange, addPerson}) => {
    return (
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <br />
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <br />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    );
}

export { PersonForm }