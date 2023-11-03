import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";
import Icons from "./Icons";

const Pais = ({ pais }) => {
  // inicializo las variables en null para que no me tire error si no estan para renderiza
  const [clima, setClima] = useState({
    main: { temp: null },
    wind: { speed: null },
  });
  let icon;
  // la pagina usadapara consumir datos es https://openweathermap.org/
  useEffect(() => {
    if (pais) {
      const api_key = import.meta.env.VITE_REACT_APP_API_KEY;
      const capital = pais.capital[0];
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric&lang=es`
        )
        .then((response) => {
          setClima(response.data);
        })
        .catch((error) => {
          console.error("error a obtener el clima", error);
        });
    }
  }, [pais]);

  if (clima.weather && clima.weather.length > 0) {
     icon = clima.weather[0].main;
   
  }
  
  return (
    <div>
      <h1>{pais.name.common}</h1>
      <p>Capital {pais.capital}</p>
      <p>Population {pais.population}</p>
      <h2>languages</h2>
      <ul>
        {Object.entries(pais.languages).map(([code, language]) => (
          <li key={code}>{language}</li>
        ))}
      </ul>
      <img src={pais.flags.png} alt="Flag" />
      <h2>Weather in {pais.capital}</h2>

      <p>temperatura: {clima.main.temp}°C</p>
      <img src={Icons(icon)} alt="icon" width='100px'/>
      <p>wind: {clima.wind.speed} m/s</p>
    </div>
  );
};
Pais.propTypes = {
  pais: PropTypes.object,
};

export { Pais };
