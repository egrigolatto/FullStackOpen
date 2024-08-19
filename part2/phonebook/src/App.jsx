import { useState, useEffect } from "react";
import axios from "axios";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    const existingNames = persons.filter(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    existingNames.length > 0
      ? alert(`El nombre ${newName} ya existe en la lista de personas.`)
      : setPersons(persons.concat(personObject));

    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    const filterText = e.target.value.toLowerCase();
    const filteredPersons =
      filterText.length > 0
        ? persons.filter((person) =>
            person.name.toLowerCase().includes(filterText)
          )
        : [];
    setFilteredPersons(filteredPersons);
    setFilterText(filterText);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        filterText={filterText}
        handleFilterChange={handleFilterChange}
        filteredPersons={filteredPersons}
      />

      <h2>Add a new</h2>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h2>Numbers</h2>

      <Persons persons={persons} />
    </div>
  );
};

export default App;
