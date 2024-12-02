import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

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
  const request = await axios.put(
    `${baseUrl}/${newObject.id}`,
    newObject,
    config
  );
  return request.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.delete(`${baseUrl}/${id}`, config);
};

const addComment = async (id, commentText) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(
    `${baseUrl}/${id}/comments`,
    { comment: commentText },
    config
  );
  return response.data;
};


export default { getAll, create, update, remove, setToken, addComment };
