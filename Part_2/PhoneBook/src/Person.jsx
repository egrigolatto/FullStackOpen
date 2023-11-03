import PropTypes from "prop-types";
import personService from './services/persons'

const Person = ({ persons, setPersons }) => {
  
 const handleDelete = (id, name) => {
   const confirmDelete = window.confirm(`¿Eliminar a ${name}?`);

   if (confirmDelete) {
     // Realiza la solicitud DELETE al servidor para eliminar la persona
     personService
       .remove(id)
       .then(() => {
         // Actualiza el estado de la aplicación después de la eliminación
         setPersons(persons.filter((person) => person.id !== id));
       })
       .catch((error) => {
         console.error("Error al eliminar la persona:", error);
       });
   }
 };

  return (
    <div>
      {persons.map((person, index) => (
        <p key={index}>
          {person.name} - {person.number}
          {"  "}
          <button onClick={() => handleDelete(person.id, person.name)}>delete</button>
        </p>
      ))}
    </div>
  );
};
Person.propTypes = {
  persons: PropTypes.array,
  setPersons: PropTypes.func,
}
export { Person };
