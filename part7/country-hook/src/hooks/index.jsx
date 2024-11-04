import { useState, useEffect } from "react";
import axios from "axios";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!name) {
      setCountry(null);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
        );
        setCountry({ data, found: true });
      } catch (error) {
        console.error("Error fetching country data:", error);
        setCountry({ data: null, found: false });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [name]);

  return { country, isLoading };
};
