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
  const [genre, setGenre] = useState([])
  const [checked, setChecked] = useState(false)
  const [checkedGenre, setCheckedGenre] = useState([])
  const { notification, setNotification } = useContext(DesignContext);

  const createAccount = (e) => {
    e.preventDefault();
    API
      .post(`${baseUrl}/user/create`, formData, {withCredentials: true})
      .then((response) => {
        setNotification([...notification, response.data.notification]);
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
        console.log('response from ',response.data)
        if (response.data.result) {
          // localStorage.setItem('token', response.data.token);
          setCurrentUser(response.data.result);
          // console.log("localstorage: " + localStorage.getItem("token"));
        }

        setNotification([...notification, response.data.notification]);
      })
      .catch((err) => console.log(err));
  };

  // console.log('localStorage', localStorage)

  function googleAuthentication(response) {
    let jwToken = response.credential;
    console.log('what is this', jwToken);
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

    API
      .post(`${baseUrl}/user/googleauth`, userObjectMod, {withCredentials: true})
      .then((response) => {
        console.log(response);
        // localStorage.setItem('token', jwToken)
        setCurrentUser(response.data.result);
        console.log('response data: ', response.data)
      });

    document.getElementById("signInDiv").hidden = true;
  }

  const handleCheck = (e) => {

    console.log( 'e.target;' , e.target)
    setChecked(!checked)

    if(e.target.checked === true){
      setCheckedGenre([...checkedGenre, e.target.value])
    }

  }

  console.log('checked genre:',  checkedGenre)

  const profileUpdate = (e) => {
    e.preventDefault();
    const updateData = [checkedGenre, formData]
    

    // e.target.filter(item => {
    //   item.
    // })

    
    API
      .patch(`${baseUrl}/user/profile/edit`, updateData, {withCredentials: true})
      .then((response) => {
        console.log('edit profile', response);
      }).catch((err) => console.log(err));
  };
  console.log('from form: ', formData)
  const checkGenre = () => {
    API
    .get(`${baseUrl}/user/checkgenre`, {withCredentials: true})
    .then((response) => {
      setGenre(response.data)
    })
  }
  useEffect(() => {
    if(currentUser){
      checkGenre()
    }
    
  }, [currentUser])
  console.log('genre DB: ',  genre)

  const logout = () => {
    API
      .get(`${baseUrl}/user/logout`)
      .then((response) => {
        // localStorage.clear();
        setCurrentUser({});
        setNotification([...notification, response.data.notification]);
      })
      .catch((err) => console.log(err));
  };

      console.log('checked genre: ',  checkedGenre)

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
    genre,
    handleCheck
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
