import React, { createContext, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [formData, setFormData] = useState({});
  // eslint-disable-next-line
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

  function handleSignOut() {
    setCurrentUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  console.log("current user " + JSON.stringify(currentUser));
  const value = {
    inputHandler,
    createAccount,
    login,
    notification,
    setNotification,
    currentUser,
    setCurrentUser,
    handleCallbackResponse,
    handleSignOut,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
