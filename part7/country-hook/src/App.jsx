import React, { useState } from "react";
import { useField, useCountry } from "./hooks";
import { Country }  from "./components/Country";

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const { country, isLoading } = useCountry(name);

  const fetchCountry = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetchCountry}>
        <input {...nameInput} />
        <button>Find</button>
      </form>
      <Country country={country} isLoading={isLoading} />
    </div>
  );
};

export default App;
