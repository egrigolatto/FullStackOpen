import PropTypes from "prop-types";

const Filter = ({ filterName, handleFilterNameChange, searchResults }) => {
  return (
    <>
      <div>
        filter show with:
        <input
          value={filterName}
          onChange={handleFilterNameChange}
          type="text"
        />
      </div>
      <div>
        {searchResults.length > 0 ? (
          searchResults.map((person, index) => (
            <p key={index}>
              {person.name} - {person.number}
            </p>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
};
Filter.propTypes = {
  filterName: PropTypes.string,
  handleFilterNameChange: PropTypes.func,
  searchResults: PropTypes.array
};
export { Filter };
