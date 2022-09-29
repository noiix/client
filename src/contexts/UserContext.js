import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import DesignContext from "./DesignContext";


const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [formData, setFormData] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const {notification, setNotification} = useContext(DesignContext)



  const createAccount = () => {
    axios
      .post("http://localhost:5001/user/create", formData)
      .then((response) => {setNotification([...notification, response.data.notification])});
  };

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log(formData);

  const login = () => {
    axios
      .post("http://localhost:5001/user/login", formData)
      .then((response) => {
        if (response.data.result) {
          setCurrentUser(response.data.result);
          localStorage.setItem("token", response.data.token);
          console.log(localStorage.getItem("token"));
        }
        setNotification([...notification, response.data.notification]);
      })
      .catch();
  };
  console.log(currentUser);
  const value = { inputHandler, createAccount, login};

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
