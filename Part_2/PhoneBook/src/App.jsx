import { useEffect, useState } from "react";
import { Filter } from "./Filter";
import { PersonForm } from "./PersonForm";
import { Person } from "./Person";
import personService from './services/persons';
import { Notificacion } from "./Notification";


const App = () => {

  const [persons, setPersons] = useState([]); // en este estado traigo los datos de la db

  // solicitud get para traer lso datos
  useEffect(() => {
    personService
       .getAll()
       .then((response) => {
       setPersons(response.data)
  });
  }, [])


  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorMesage, setErrorMessage] = useState(null);
 

  const addName = (e) => {
    e.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    const existingPerson = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (existingPerson) {
      // Si el nombre ya existe, preguntar al usuario si desea actualizar el número
      const confirmUpdate = window.confirm(
        `${newName} ya está en la lista. ¿Desea actualizar su número?`
      );

      if (confirmUpdate) {
        // Realiza la solicitud PUT al servidor para actualizar el número
        personService
          .update(existingPerson.id, nameObject)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id === existingPerson.id ? response.data : person
              )
            );
            setNewName("");
            setNewNumber("");
            setNotificationMessage(`you modified ${nameObject.name}`);
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
            
          })
          .catch((error) => {
            setErrorMessage(
              `information of ${nameObject.name} has already been removed from server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
            console.error("Error al actualizar el número:", error);
          });
      }
    } else {
      // Si el nombre no existe, agregarlo a la lista
      personService
        .create(nameObject)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setNewName("");
          setNewNumber("");
          setNotificationMessage(`Added ${nameObject.name}`);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setErrorMessage(
            'server error'
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
          console.error("Error al agregar el nuevo contacto:", error);
        });
    }


  }

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterNameChange = (e) => {
    const filterText = e.target.value;
    setFilterName(filterText);

    // Filtrar personas que coincidan con el texto de búsqueda
    const results = persons.filter((person) =>
      person.name.toLowerCase().includes(filterText.toLowerCase())
    );

    setSearchResults(results);
  };


  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notificacion message={notificationMessage} errorMensaje={errorMesage} />

      <Filter
        filterName={filterName}
        handleFilterNameChange={handleFilterNameChange}
        searchResults={searchResults}
      />

      <h2>add a new</h2>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addName={addName}
      />

      <h2>Numbers</h2>
      <Person persons={persons} setPersons={setPersons} />
    </div>
  );
};

export default App;
