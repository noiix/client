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

  const [profile, setProfile] = useLocalStorage("profile", {})

  const [genre, setGenre] = useState([]);
  const [instrument, setInstrument] = useState([]);
  const [checked, setChecked] = useState(false);
  const [checkedGenre, setCheckedGenre] = useState([]);
  const [mySongs, setMySongs] = useState([]);
  const [introText, setIntroText] = useState('');
  const [toggleTextBtn, setToggleTextBtn] = useState(false);

  const { notification, setNotification, setDisplayNav, setDisplayModal, closeModal } = useContext(DesignContext);

  const createAccount = (e) => {
    e.preventDefault();
    API.post(`${baseUrl}/user/create`, formData, { withCredentials: true })
      .then((response) => {
        console.log("reponse notification", response);
        if (Array.isArray(response.data)) {
          response.data.map((note) => {
            console.log("single note", note);
            if (checkNotification(note)) {
              setNotification([...notification, note]);
            }
          });
        } else {
          if (checkNotification(response.data.notification)) {
            setNotification([...notification, response.data.notification]);
          }
        }
      })
      .catch((err) => console.log(err));
  };

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };
  // console.log("form data: " + formData);

  const introTextHandler = (e) => {
    setIntroText(e.target.value);
    console.log('introTextHandler check', e.target.value);
  }



  const login = (e) => {
    e.preventDefault();
    API.post(`${baseUrl}/user/login`, formData, { withCredentials: true })
      .then((response) => {
        if (response.data.info) {
          setCurrentUser(response.data.info);
        }

        if (checkNotification(response.data.notification)) {
          setNotification([...notification, response.data.notification]);
        }
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

    API.post(`${baseUrl}/user/googleauth`, userObjectMod, {
      withCredentials: true,
    }).then((response) => {
      setCurrentUser(response.data.result);
    });
  }

  const handleCheck = (e) => {
    console.log("e.target;", e.target);
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
    closeModal();
    formData = { ...formData, genre: genre, instrument: instrument};
    setDisplayModal(false)
    API.patch(`${baseUrl}/user/profile/edit`, formData, {
      withCredentials: true,
    })
      .then((response) => {
        console.log('profile update', response.data)
        setCurrentUser(response.data)
        setProfile(response.data)
      })
      .catch((err) => console.log(err));
  };


  const introTextUpdate = (e) => {
    // e.preventDefault();
    const introTextStr = {intro_text: introText}
    API.patch(`${baseUrl}/user/profile/text`, introTextStr, {
      withCredentials: true
    })
    .then((response) => {
      console.log('introText update', response.data)
      setCurrentUser(response.data.result)
      setProfile(response.data.result)
      setToggleTextBtn(false);
    })
    .catch((err) => console.log(err));
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
          console.log('my songs', response.data)
          setMySongs(response.data)
        }
      })
  }

  useEffect(() => {
    if (currentUser) {
      checkIfChecked();
      getNearbyUsers();
      getAllMyTracks();
    }
  }, [currentUser]);


  const getNearbyUsers = () => {
    API.get(`${baseUrl}/user/all`, { withCredentials: true }).then(
      (response) => {
        console.log("response all users", response);
        if(response.data.result) {
          const filteredUsers = response.data.result.filter(user => user._id !== currentUser._id)
          setUsers(filteredUsers);
        }
        else {
          setNotification([...notification, response.data.notification]);
        }
      }
    );
  };

  const logout = () => {
    API.get(`${baseUrl}/user/logout`)
      .then((response) => {
        localStorage.clear();
        setCurrentUser({});
        if(checkNotification(response.data.notification))
        {
          setDisplayNav(false);
          closeModal();
          setNotification([...notification, response.data.notification])
        };
      })
      .catch((err) => console.log(err));
  };

  const checkNotification = (note) => {
    if (notification.filter((n) => n !== note).length > 0) {
      return true;
    } else {
      return false;
    }
  };



  
  const value = {
    inputHandler,
    introTextHandler,
    createAccount,
    login,
    logout,
    notification,
    setNotification,
    currentUser,
    setCurrentUser,
    googleAuthentication,
    profileUpdate,
    introTextUpdate,
    genre,
    instrument,
    handleCheck,
    users,
    profile,
    setProfile, 
    mySongs, 
    setMySongs,
    introText,
    setToggleTextBtn,
    toggleTextBtn
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
