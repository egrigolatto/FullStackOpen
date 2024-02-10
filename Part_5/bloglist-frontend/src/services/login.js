import axios from "axios";
const baseUrl = "http://localhost:3003/api/login";

const login = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log('loginError', error.message);
  }
  
};

export default { login };
