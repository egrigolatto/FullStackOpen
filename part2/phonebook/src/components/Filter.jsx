
const Filter = ({ filterText, handleFilterChange, filteredPersons }) => {
  
  
  return (
    <>
      filter shown with:{" "}
      <input value={filterText} onChange={handleFilterChange} />
      <br />
      {filteredPersons.map((p) => (
        <p key={p.id}>{p.name} {p.number}</p>
      ))}
    </>
  );
};

export { Filter };
