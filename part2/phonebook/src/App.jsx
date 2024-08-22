import { useState, useEffect } from "react";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const existingNames = persons.filter(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (existingNames.length > 0) {
      const confirmUpdate = window.confirm(
        `${newName} ya está en la lista. ¿Desea actualizar su número?`
      );

      if (confirmUpdate) {
        personService
          .update(existingNames[0].id, personObject)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingNames[0].id ? person : response.data
              )
            );
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            console.log(error);
            setNewName("");
            setNewNumber("");
          });
      }
    } else {
      personService
        .create(personObject)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          console.log(error);
          setNewName("");
          setNewNumber("");
        });
    }
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

  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id);

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch((error) => {
          console.log(error);
          alert(
            `Information of ${person.name} has already been removed from server`
          );
          setPersons(persons.filter((p) => p.id !== id));
        });
    }
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

      <Persons persons={persons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
