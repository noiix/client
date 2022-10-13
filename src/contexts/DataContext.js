import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import baseUrl from "../config";
import {useNavigate} from 'react-router-dom'
import DesignContext from "../contexts/DesignContext";
import UserContext from "../contexts/UserContext";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { notification, setNotification } = useContext(DesignContext);
  const { currentUser, setCurrentUser, setProfile, profile, mySongs, setMySongs, usersForSearch, users, setUsers, getNearbyUsers} = useContext(UserContext)

  const API = axios.create({ baseUrl: baseUrl });

  let navigate = useNavigate();

  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [displaySearch, setDisplaySearch] = useState(false);
  
  // const [formData, setFormData] = useState({})

  const likeSongs = (index) => {
    const songToLike = profile.music[index]
    console.log('songtolike', songToLike)
    API.patch(`${baseUrl}/user/likesong`, songToLike, {withCredentials: true})
    .then(response => {
      setCurrentUser(response.data.data);
      setProfile(response.data.data)
    })
  }
 
  const submitForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    // formData.title =  fileName;
    // formData.file = selectedFile;
    formData.append("title", fileName);
    formData.append("file", selectedFile);

    // setFormData({...formData, title: fileName, file: selectedFile})

    console.log("onsubmit", formData);

    API.post(`${baseUrl}/music/upload`, formData, {
      withCredentials: true,
      "Content-Type": "multipart/form-data",
    }).then((response) => {
      if(response.data.result){
        setCurrentUser(response.data.result)
        setProfile(response.data.result)
        setMySongs(response.data.result.music)
      }
      setNotification([...notification, response.data.notification]);
    });
  };

  const submitPicture = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append('title', e.target.value)
    console.log('onsubmit',formData);
    API.post(`${baseUrl}/user/profile/profilepicture`, formData, {
      withCredentials: true,
    }).then((response) => {
      setNotification([...notification, response.data.notification]);
      setProfile(response.data.result);
      setCurrentUser(response.data.result);
    });
  };

  console.log('new user', currentUser)

  const handleFileInput = (e) => {
    // console.log('file', e.target.name)
    const file = e.target.files[0];
    console.log("file", file);
    setSelectedFile(file);
  };

  const deleteTrack = (index) => {
    const songToDelete = profile.music[index]
    console.log('song to delete', songToDelete)
    const updatedTracks = profile.music.filter((song, idx) => idx !== index)
    const songObj = {newSongList: updatedTracks, deleteSong: songToDelete}
    API.patch(`${baseUrl}/music/delete`, songObj, { withCredentials: true})
    .then(response => {
      setCurrentUser(response.data.result);
      setProfile(response.data.result);
      setNotification([...notification, response.data.notification]);
    }).catch()
  }

  const inputSearchHandler = (e) => {
    e.preventDefault();
    let query = e.target.value.toLowerCase().toString();
    console.log('query', query)
    if (!query) {
      const filteredUsers = usersForSearch.filter(user => user._id !== currentUser._id)
      setUsers(filteredUsers);
      getNearbyUsers()
    } else {
      const newSearchResult = usersForSearch.filter(user => user.instrument.includes(query) || user.genre.includes(query) || user.username.toLowerCase().includes(query))
      setUsers(newSearchResult)
      navigate('/');
      console.log('newSearchResult', newSearchResult)
    }

  }

  console.log('search', users)
 

  const value = {
    setFileName,
    setSelectedFile,
    submitForm,
    fileName,
    selectedFile,
    handleFileInput,
    submitPicture,
    deleteTrack,
    likeSongs,
    isLiked,
    currentSong,
    inputSearchHandler,
    displaySearch, 
    setDisplaySearch
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataContext;
