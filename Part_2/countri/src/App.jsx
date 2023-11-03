import { useState, useEffect } from "react"
import axios from 'axios'
import { Pais } from "./Pais";


function App() {
  
  const [pais, setPais] = useState(''); // estado para almacenar el nombre del pais que ingresa
  const [paises, setPaises] = useState([]); // estado para la peticion con axios
  const [filtrarPaises, setFiltrarPaises] = useState([]); // este estado me guarda la lista de paises o pais buscado
  const [paisShow, setPaisShow] = useState(null); // estado para mostrar el pais elegido con el boton
  
 

  // aqui obtenemos los datos de la api y actualizamos el estado paises
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setPaises(response.data);
      })
      .catch((error) => {
        // Manejar el error y mostrar en consola
        console.error("Error al obtener los países:", error);
        // Opcionalmente, podria establecer un estado para indicar que ocurrió un error.
        // setError(true);
      });
  }, [])
  
  // funcion que recibe el evento del input y actualiza el estado de pais
  const buscarPais = (e) => {
    setPais(e.target.value)
    // funcion para buscar a traves del metodo filter
    //buscar es un nuevo array con los nombres coincidentes
    const buscar = paises.filter((pais) =>
      pais.name.common.toLowerCase().includes(e.target.value.toLowerCase())
    );
    // aca actualizo filtrarPais con la lista obtenida a traves de filter
    setFiltrarPaises(buscar);
    // para que vuelva el estado a null, sino queda en pantalla
    setPaisShow(null);
  }

  const controlarBtn = (data) => {
    setPaisShow(data);
    setFiltrarPaises([]);
  }
  
  const mostrarPaises = (filtrarPaises) => {
    if (filtrarPaises.length === 1) {
      const pais = filtrarPaises[0];
      return <Pais pais={pais} />
    } else if (filtrarPaises.length < 10) {
      return filtrarPaises.map((data) => (
        <div key={data.name.common}>
            <p>{data.name.common}</p>
            <button onClick={() => controlarBtn(data)}>Show</button>
          </div>
        ));
    }
  } 
  
  return (
    <div>
      <form>
        <label>find countries </label>
        <input value={pais} type="text" onChange={buscarPais} required />
      </form>

      <div>
        {filtrarPaises.length > 10 ? (
          <p>To many matches, specify another filter</p>
        ) : (
          mostrarPaises(filtrarPaises)
        )}
        { paisShow && (<Pais pais={paisShow}/>) }
      </div>
    </div>
  );
}

export default App
