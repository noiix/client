import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import DesignContext from "./DesignContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [formData, setFormData] = useState({});

  const [currentUser, setCurrentUser] = useState({});
  const {notification, setNotification} = useContext(DesignContext);

  const createAccount = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5001/user/create", formData)
      .then((response) => {setNotification([...notification, response.data.notification])})
      .catch(err => console.log(err))
  };

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log("form data: " + formData);

  const login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5001/user/login", formData)
      .then((response) => {
        if (response.data.result) {
          setCurrentUser(response.data.result);
          localStorage.setItem("token", response.data.token);
          console.log("localstorage: " + localStorage.getItem("token"));
        }

        setNotification([...notification, response.data.notification]);
      })
      .catch(err => console.log(err));
  };

  function handleCallbackResponse(response) {
    let jwToken = response.credential;
    console.log(jwToken);
    const userObject = jwt_decode(jwToken);

    console.log(userObject);

    const userObjectMod = {
      username: userObject.name,
      email: userObject.email,
      password: userObject.sub,
      verified: userObject.email_verified,
      image: userObject.picture,
      createdAt: Date(),
    };

    axios
      .post("http://localhost:5001/user/googleauth", userObjectMod)
      .then((response) => {
        console.log(response);
        setCurrentUser(response.data);
      });

    document.getElementById("signInDiv").hidden = true;
  }

 
  const logout = () => {
    axios.get("http://localhost:5001/user/logout")
    .then((response) => {
      localStorage.removeItem("token");
      setCurrentUser({})
      setNotification([...notification, response.data.notification]); 
    }
    ).catch(err => console.log(err))
  }
  
  console.log("current user " + JSON.stringify(currentUser));

  const value = {
    inputHandler,
    createAccount,
    login,
    logout,
    notification,
    setNotification,
    currentUser,
    setCurrentUser,
    handleCallbackResponse
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
