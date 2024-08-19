import { useState } from "react";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [filterText, setFilterText] = useState("");

  const addPerson = (e) =>{
    e.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    const existingNames = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase());
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

      <Persons
        persons={persons}
      />
    </div>
  );
};

export default App;
