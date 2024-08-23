import { useState, useEffect } from "react";
import axios from "axios";
import Icons from "./Icons";

const Country = ({ country }) => {
  const [weather, setWeather] = useState({
    main: { temp: null },
    wind: { speed: null },
  });
  let icon;
  // la pagina usadapara consumir datos es https://openweathermap.org/
  useEffect(() => {
    if (country) {
      const api_key = import.meta.env.VITE_REACT_APP_API_KEY;
      const capital = country.capital[0];
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric&lang=es`
        )
        .then((response) => {
          setWeather(response.data);
        })
        .catch((error) => {
          console.error("error a obtener el clima", error);
        });
    }
  }, [country]);

  if (weather.weather && weather.weather.length > 0) {
    icon = weather.weather[0].main;
  }

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>languages</h2>
      <ul>
        {Object.entries(country.languages).map(([code, language]) => (
          <li key={code}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="Flag" />

      <h2>Weather in {country.capital}</h2>

      <p>temperatura: {weather.main.temp}°C</p>
      <img src={Icons(icon)} alt="icon" width="100px" />
      <p>wind: {weather.wind.speed} m/s</p>
    </div>
  );
};

export { Country };
