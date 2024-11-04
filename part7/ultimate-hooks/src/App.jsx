import { useField, useResource } from "./hooks";

const App = () => {
  const { reset: resetContent, ...content } = useField("text");
  const { reset: resetName, ...name } = useField("text");
  const { reset: resetNumber, ...number } = useField("text");

  const {
    resources: notes,
    service: noteService,
    loading: notesLoading,
    error: notesError,
  } = useResource("http://localhost:3005/notes");
  const {
    resources: persons,
    service: personService,
    loading: personsLoading,
    error: personsError,
  } = useResource("http://localhost:3005/persons");

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({ content: content.value });

    resetContent();
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({ name: name.value, number: number.value });

    resetName();
    resetNumber();
  };

  return (
    <div>
      <h2>Notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>

      {notesLoading ? (
        <p>Loading notes...</p>
      ) : notesError ? (
        <p style={{ color: "red" }}>{notesError}</p>
      ) : (
        notes.map((n) => <p key={n.id}>{n.content}</p>)
      )}

      <h2>Persons</h2>
      <form onSubmit={handlePersonSubmit}>
        <div>
          name <input {...name} />
        </div>
        <div>
          number <input {...number} />
        </div>
        <button>create</button>
      </form>

      {personsLoading ? (
        <p>Loading persons...</p>
      ) : personsError ? (
        <p style={{ color: "red" }}>{personsError}</p>
      ) : (
        persons.map((n) => (
          <p key={n.id}>
            {n.name} {n.number}
          </p>
        ))
      )}
    </div>
  );
};

export default App;
