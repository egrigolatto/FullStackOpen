export const Country = ({ country, isLoading }) => {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!country) {
    return;
  }

  if (!country.found) {
    return <p>Country not found.</p>;
  }

  const { data } = country;
  return (
    <div>
      <h3>{data.name.common}</h3>
      <p>Capital: {data.capital}</p>
      <p>Population: {data.population}</p>
      <img
        src={data.flags.png}
        alt={`Flag of ${data.name.common}`}
        width="100"
      />
    </div>
  );
};
