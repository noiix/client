import React, { createContext, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [formData, setFormData] = useState({});
  const [currentUser, setCurrentUser] = useState({});

  //alert notifications
  const [notification, setNotification] = useState(null);

  const createAccount = () => {
    axios
      .post("http://localhost:5001/user/create", formData)
      .then((response) => console.log(response));
  };

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log("form data: " + formData);

  const login = () => {
    axios
      .post("http://localhost:5001/user/login", formData)
      .then((response) => {
        if (response.data.result) {
          setCurrentUser(response.data.result);
          localStorage.setItem("token", response.data.token);
          console.log("localstorage: " + localStorage.getItem("token"));
        }
        setNotification(response.data.message);
      })
      .catch();
  };
  console.log("current user " + JSON.stringify(currentUser));
  const value = {
    inputHandler,
    createAccount,
    login,
    notification,
    setNotification,
    currentUser,
    setCurrentUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
