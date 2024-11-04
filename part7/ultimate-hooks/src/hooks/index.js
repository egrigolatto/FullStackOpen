import { useState, useEffect } from "react";
import axios from "axios";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return {
    type,
    value,
    onChange,
    reset
  };
};

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(baseUrl);
        setResources(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching resources:", error);
        setError("Failed to fetch resources");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [baseUrl]);

  const create = async (resource) => {
    try {
      const response = await axios.post(baseUrl, resource);
      setResources((prevResources) => [...prevResources, response.data]);
      setError(null);
    } catch (error) {
      console.error("Error creating resource:", error);
      setError("Failed to create resource");
    }
  };

  const service = {
    create,
  };

  return { resources, service, loading, error };
};
