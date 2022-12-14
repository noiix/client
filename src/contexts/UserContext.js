import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import useLocalStorage from "use-local-storage";
import jwt_decode from "jwt-decode";
import DesignContext from "./DesignContext";
import baseUrl from "../config";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const API = axios.create({ baseUrl: baseUrl });

  let [formData, setFormData] = useState({});
  const [currentUser, setCurrentUser] = useLocalStorage("currentUser", {});
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [profile, setProfile] = useLocalStorage("profile", {})
  const [genre, setGenre] = useState([]);
  const [instrument, setInstrument] = useState([]);
  const [checked, setChecked] = useState(false);
  const [checkedGenre, setCheckedGenre] = useState([]);
  const [mySongs, setMySongs] = useState([]);
  const [introText, setIntroText] = useState('');
  const [toggleTextBtn, setToggleTextBtn] = useState(false);
  const [myFavorites, setMyFavorites] = useState([])
  const [usersForSearch, setUsersForSearch] = useState([]);
  const [urls, setUrls] = useState([]);
  const [location, setLocation] = useState({})

  const { notification, addNewNotification, setDisplayNav, closeModal } = useContext(DesignContext);

  const createAccount = (e) => {
    e.preventDefault();
    API.post(`${baseUrl}/user/create`, formData, { withCredentials: true })
      .then((response) => {
        if (Array.isArray(response.data)) {
          response.data.map((note) => addNewNotification(note));
        } else {
            addNewNotification(response.data.notification);
        }
        response.data.notification.status === 'ok' && closeModal()
      })
      .catch((err) => console.log(err));
  };

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const introTextHandler = (e) => {
    setIntroText(e.target.value);
  }

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://ip-geo-location.p.rapidapi.com/ip/check',
      params: {format: 'json'},
      headers: {
        'X-RapidAPI-Key': 'e470fe30c8mshec14cb43e486919p1ab1afjsna76d56764b44',
        'X-RapidAPI-Host': 'ip-geo-location.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      setLocation(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }, []);



  const login = (e) => {
    e.preventDefault();
    formData = {...formData, location}
    API.post(`${baseUrl}/user/login`, formData, { withCredentials: true })
      .then((response) => {
        if (response.data.info) {
          setCurrentUser(response.data.info);
          // setContacts(response.data.info.contacts)
        }
          addNewNotification(response.data.notification);
      })
      .catch((err) => console.log(err));
  };


  function googleAuthentication(response) {
    let jwToken = response.credential;
    const userObject = jwt_decode(jwToken);

    const userObjectMod = {
      username: userObject.name,
      email: userObject.email,
      password: userObject.sub,
      verified: userObject.email_verified,
      createdAt: Date(),
      location: location
    };

    API.post(`${baseUrl}/user/googleauth`, userObjectMod, {
      withCredentials: true,
    }).then((response) => {
      // localStorage.setItem('token', jwToken)
      setCurrentUser(response.data.result);
      setContacts(response.data.result.contacts);
    });
  }

  const addContact = () => {
    const contactId = {contactId: profile._id}
    API.patch(`${baseUrl}/user/addcontact`, contactId, {withCredentials: true})
      .then(response => {
        setContacts(response.data.contacts)
        setCurrentUser(response.data)
      })
  }



  const handleCheck = (e) => {
    setChecked(!checked);

    if (
      e.target.checked === true &&
      !genre.includes(e.target.value) &&
      e.target.name === "genre"
    ) {
      setGenre([...genre, e.target.value]);
    } else if (
      e.target.checked === true &&
      !instrument.includes(e.target.value) &&
      e.target.name === "instruments"
    ) {
      setInstrument([...instrument, e.target.value]);
    } else if (
      e.target.checked !== true &&
      genre.includes(e.target.value) &&
      e.target.name === "genre"
    ) {
      const updatedGenre = genre.filter((item) => item !== e.target.value);
      setGenre(updatedGenre);
    } else if (
      e.target.checked !== true &&
      instrument.includes(e.target.value) &&
      e.target.name === "instruments"
    ) {
      const updatedInstrument = instrument.filter(
        (item) => item !== e.target.value
      );
      setInstrument(updatedInstrument);
    }
  };


  const profileUpdate = (e) => {
    e.preventDefault();
    formData = { genre: genre, instrument: instrument};
    closeModal();
    API.patch(`${baseUrl}/user/profile/edit`, formData, {
      withCredentials: true,
    })
      .then((response) => {
        setCurrentUser(response.data)
        setProfile(response.data)
      })
      .catch((err) => console.log(err));
  };

  const profileUpdateName = (e) => {
    e.preventDefault();
    API.patch(`${baseUrl}/user/profile/editname`, formData, { withCredentials: true })
    .then(response => { 
      setCurrentUser(response.data)
      setProfile(response.data)
    }).catch(err => console.log(err))
   
  }


  const introTextUpdate = (e) => {
    e.preventDefault();
    const introTextStr = {intro_text: introText}
    if(introTextStr.intro_text.length >= 50){
      API.patch(`${baseUrl}/user/profile/text`, introTextStr, {
        withCredentials: true
      })
      .then((response) => {
        setCurrentUser(response.data.result)
        setProfile(response.data.result)
        setToggleTextBtn(false);
      })
      .catch((err) => console.log(err));
    } else {
      addNewNotification({type: 'info', title: 'Please, provide at least 50 characters.'})
    }
  }


  const checkIfChecked = () => {
    API.get(`${baseUrl}/user/checkifchecked`, { withCredentials: true }).then(
      (response) => {
        setGenre(response.data.genre);
        setInstrument(response.data.instrument);
      }
    );
  };

  const getAllMyTracks = () => {
    API.get(`${baseUrl}/music/mysongs`, { withCredentials: true })
      .then(response => {
        if(response.data) {
          setMySongs(response.data)
        }
      })
  }

  const getAllMyFavorites = () => {
    API.get(`${baseUrl}/music/favorites`, { withCredentials: true})
    .then(response => {
      if(response.data) {
        setMyFavorites(response.data.result)
      }
    })
  }

  const getAllMyContacts = () => {
    API.get(`${baseUrl}/user/contacts`, { withCredentials: true})
    .then(response => {
      setContacts(response.data.contacts)
    })
  }

  useEffect(() => {
    if (Object.keys(currentUser).length > 0) {
      checkIfChecked();
      getNearbyUsers();
      getAllMyTracks();
      getAllMyFavorites();
      getAllMyContacts();
    }
  }, [currentUser, currentUser.genre]);

  const getNearbyUsers = () => {
    API.get(`${baseUrl}/user/all`, { withCredentials: true }).then(
      (response) => {
        if(response.data.result) {
          const filteredUsers = response.data.result.filter(user => user._id !== currentUser._id)
          if(filteredUsers) {
            setUsers(filteredUsers);
            setUsersForSearch(filteredUsers);
          }
        }
        else {
          addNewNotification(response.data.notification);
        }
      }
    );
  };

  const logout = () => {
    API.get(`${baseUrl}/user/logout`)
      .then((response) => {
        setCurrentUser({});
        setUsers([]);
        localStorage.clear();
          setDisplayNav(false);
          closeModal();
          addNewNotification(response.data.notification)
       
      })
      .catch((err) => console.log(err));
  };


  
  const value = {
    inputHandler,
    introTextHandler,
    createAccount,
    login,
    logout,
    currentUser,
    setCurrentUser,
    googleAuthentication,
    profileUpdate,
    introTextUpdate,
    genre,
    instrument,
    handleCheck,
    users,
    setUsers,
    profile,
    setProfile, 
    mySongs, 
    setMySongs,
    introText,
    setToggleTextBtn,
    toggleTextBtn,
    getNearbyUsers,
    usersForSearch,
    addContact,
    contacts,
    profileUpdateName,
    checkIfChecked,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;