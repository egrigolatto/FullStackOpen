import axios from 'axios'
const baseUrl = "http://localhost:3003/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (newObject) => {
  
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (newObject) => {

  const config = {
    headers: { Authorization: token },
  };

  const request = await axios.put(`${baseUrl}/${newObject.id}`, newObject, config);
  return request.data;
};

const remove = (deleteBlog) => {
  
  const config = {
    headers: { Authorization: token },
  };

   axios.delete(`${baseUrl}/${deleteBlog.id}`, config);
  
}

export default { getAll, create, update, setToken, remove };