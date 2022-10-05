import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import useLocalStorage from "use-local-storage";
import jwt_decode from "jwt-decode";
import DesignContext from "./DesignContext";
import baseUrl from '../config'

const UserContext = createContext();

export const UserProvider = ({ children }) => {


  const API = axios.create({baseUrl: baseUrl});

  const [formData, setFormData] = useState({});
  const [currentUser, setCurrentUser] = useLocalStorage('currentUser', {});
  const [users, setUsers] = useState([]);

  const [genre, setGenre] = useState([])

  const { notification, setNotification } = useContext(DesignContext);

  const createAccount = (e) => {
    e.preventDefault();
    API
      .post(`${baseUrl}/user/create`, formData, {withCredentials: true})
      .then((response) => {
        if(checkNotification(response.data.notification))
        {
          setNotification([...notification, response.data.notification])
        };
      })
      .catch((err) => console.log(err));
  };

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // console.log("form data: " + formData);

  const login = (e) => {
    e.preventDefault();
    API
      .post(`${baseUrl}/user/login`, formData, {withCredentials: true})
      .then((response) => {
        if (response.data.result) {
          // localStorage.setItem('token', response.data.token);
          setCurrentUser(response.data.result);
          // console.log("localstorage: " + localStorage.getItem("token"));
        }

        if(checkNotification(response.data.notification))
        {
          setNotification([...notification, response.data.notification])
        };
      })
      .catch((err) => console.log(err));
  };

  // console.log('localStorage', localStorage)

  function googleAuthentication(response) {
    let jwToken = response.credential;
    const userObject = jwt_decode(jwToken);

    const userObjectMod = {
      username: userObject.name,
      email: userObject.email,
      password: userObject.sub,
      verified: userObject.email_verified,
      image: userObject.picture,
      createdAt: Date(),
    };

    API
      .post(`${baseUrl}/user/googleauth`, userObjectMod, {withCredentials: true})
      .then((response) => {
        console.log(response);
        // localStorage.setItem('token', jwToken)
        setCurrentUser(response.data.result);
      });

    // document.getElementById("signInDiv").hidden = true;
  }

  const profileUpdate = (e) => {
    e.preventDefault();
    const updateData = [currentUser, formData]

    API
      .patch(`${baseUrl}/user/profile/edit`, formData, {withCredentials: true})
      .then((response) => {
        console.log('edit profile', response);
      }).catch((err) => console.log(err));

  };

  const checkGenre = () => {
    API
    .get(`${baseUrl}/user/checkgenre`, {withCredentials: true})
    .then((response) => {
      setGenre(response.data)
    })
  }
  useEffect(() => {

    checkGenre()
    
  }, [])

  const getNearbyUsers = () => {
    API.get(`${baseUrl}/all, {withCredentials: true}`)
    .then(response => {
      setUsers(response.data.result)
    })
  }

  useEffect(() => {
    if(currentUser) {
      getNearbyUsers()
    }
  }, [currentUser])


  const logout = () => {
    API
      .get(`${baseUrl}/user/logout`)
      .then((response) => {
        localStorage.clear();
        setCurrentUser({});
        if(checkNotification(response.data.notification))
        {
          setNotification([...notification, response.data.notification])
        };
      })
      .catch((err) => console.log(err));
  };


  const checkNotification = (note) => {
    if(notification.filter(n => n !== note).length > 0) {
      return true
    } else {
      return false
    } 
  }

  const value = {
    inputHandler,
    createAccount,
    login,
    logout,
    notification,
    setNotification,
    currentUser,
    setCurrentUser,
    googleAuthentication,
    profileUpdate,
    genre
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
