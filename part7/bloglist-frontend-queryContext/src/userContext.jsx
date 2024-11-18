import { createContext, useContext, useState, useEffect } from "react";
import blogService from "./services/blogs";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);


  const login = (userData) => {
    setUser(userData);
    window.localStorage.setItem("loggedNoteappUser", JSON.stringify(userData));
    blogService.setToken(userData.token);
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedNoteappUser");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
