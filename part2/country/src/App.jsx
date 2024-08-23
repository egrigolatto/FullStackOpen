import { useEffect, useState } from "react";
import axios from "axios";
import { Country } from "./Country";

function App() {
  const [country, setCountry] = useState("");
  const [countrys, setCountrys] = useState([]);
  const [filterCountry, setFilterCountry] = useState([]);
  const [showContry, setShowContry] = useState(null);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountrys(response.data))
      .catch((error) => console.error(error));
  }, []);


  const findPais = (e) => {
    setCountry(e.target.value);
    
    const search = countrys.filter((pais) =>
      pais.name.common.toLowerCase().includes(e.target.value.toLowerCase())
    );
    
    setFilterCountry(search);
    setShowContry(null);
  };

  const handleShowContry = (country) => {
    setShowContry(country);
    setCountry(country.name.common)
    setFilterCountry([]);
  };

  const showContrys = (filterCountry) => {
    if (filterCountry.length === 1) {
      const country = filterCountry[0];
      return <Country country={country} />;
    } else if (filterCountry.length < 10) {
      return filterCountry.map((country) => (
        <div key = {country.name.common}>
          <p>{country.name.common}</p>
          <button onClick={() => handleShowContry(country)}>Show</button>
        </div >
      ));
    }
  };
  return (
    <>
      <form>
        <label>find countries </label>
        <input value={country} type="text" onChange={findPais} required />
      </form>
      <div>
        {country !== "" && (filterCountry.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : (
          showContrys(filterCountry)
        ))}
        {showContry !== null && <Country country={showContry} />}
      </div>
    </>
  );
}

export default App;
