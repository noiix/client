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

  const { notification, addNewNotification, setDisplayNav, closeModal } = useContext(DesignContext);

  const createAccount = (e) => {
    e.preventDefault();
    API.post(`${baseUrl}/user/create`, formData, { withCredentials: true })
      .then((response) => {
        console.log(typeof response.data)
        // console.log("reponse notification", response.data.notification.status);
        if (Array.isArray(response.data)) {
          response.data.map((note) => {
            console.log("single note", note);
              addNewNotification(note);
          });
        } else {
            addNewNotification(response.data.notification);
            console.log('else', response.data.notification)
        }
        response.data.notification.status === 'ok' && closeModal()
      })
      .catch((err) => console.log(err));
  };

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log(e.target.value);
  };
  // console.log("form data: " + formData);

  const introTextHandler = (e) => {
    setIntroText(e.target.value);
    // console.log('introTextHandler check', e.target.value);
  }



  const login = (e) => {
    e.preventDefault();
    API.post(`${baseUrl}/user/login`, formData, { withCredentials: true })
      .then((response) => {
        console.log('response.data', response.data)
        if (response.data.info) {
          setCurrentUser(response.data.info);
          // setContacts(response.data.info.contacts)
        }
          addNewNotification(response.data.notification);
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
      createdAt: Date(),
    };

    API.post(`${baseUrl}/user/googleauth`, userObjectMod, {
      withCredentials: true,
    }).then((response) => {
      console.log('response.data', response.data)
      // localStorage.setItem('token', jwToken)
      setCurrentUser(response.data.result);
      setContacts(response.data.result.contacts);
    });
  }

  const addContact = () => {
    const contactId = {contactId: profile._id}
    // console.log(contactId)
    // console.log('new contacts', contacts)
    API.patch(`${baseUrl}/user/addcontact`, contactId, {withCredentials: true})
      .then(response => {
        setContacts(response.data.contacts)
        setCurrentUser(response.data)
      })
  }

  // console.log('contacts after setting it', contacts)


  const handleCheck = (e) => {
    // console.log("e.target;", e.target);
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
  // const updatedInstrument = instrument.filter(item => item !== e.target.value)
  // setInstrument(updatedInstrument)

  // console.log('checked genre:',  genre, instrument)

  const profileUpdate = (e) => {
    e.preventDefault();
    formData = { genre: genre, instrument: instrument};
    closeModal();
    API.patch(`${baseUrl}/user/profile/edit`, formData, {
      withCredentials: true,
    })
      .then((response) => {
        // console.log('profile update', response.data)
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
        // console.log('introText update', response.data)
        setCurrentUser(response.data.result)
        setProfile(response.data.result)
        setToggleTextBtn(false);
      })
      .catch((err) => console.log(err));
    } else {
      // console.log('intro text too short.')
      addNewNotification({type: 'info', title: 'Please, provide at least 50 characters.'})
    }
  }


  console.log('new currentUser', currentUser)
  const checkIfChecked = () => {
    API.get(`${baseUrl}/user/checkifchecked`, { withCredentials: true }).then(
      (response) => {
        setGenre(response.data.genre);
        setInstrument(response.data.instrument);
      }
    );
  };

  const getAllMyTracks = () => {
    API.get(`${baseUrl}/music/mysongs`, { withCredentials: true})
      .then(response => {
        if(response.data) {
          // console.log('my songs', response.data)
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
      // console.log('contacts response', response)
      setContacts(response.data.contacts)
    })
  }

  // useEffect(() => {
  //   getNearbyUsers()
    
  // }, [])

  // const getUrls = () => {
  //   const newUrls = users && users.map(user => user.music.length > 0 && user.music[0].path);
  //   setUrls(newUrls)
  // }

  useEffect(() => {
    if (Object.keys(currentUser).length > 0) {
      console.log('this is from the big useeffect')
      checkIfChecked();
      getNearbyUsers();
      getAllMyTracks();
      getAllMyFavorites();
      getAllMyContacts();
      // getUrls();
    }
  }, [currentUser, currentUser.genre]);

  const getNearbyUsers = () => {
    API.get(`${baseUrl}/user/all`, { withCredentials: true }).then(
      (response) => {
        // console.log("response all users", response);
        if(response.data.result) {
          const filteredUsers = response.data.result.filter(user => user._id !== currentUser._id)
          if(filteredUsers) {
            setUsers(filteredUsers);
            setUsersForSearch(filteredUsers);
            console.log('nearby users', response.data.result)
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

  // const checkNotification = (note) => {
  //   if (notification.filter((n) => n !== note).length > 0) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  
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
    // urls
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
