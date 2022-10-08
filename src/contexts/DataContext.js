import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import baseUrl from "../config";
import DesignContext from "../contexts/DesignContext";
import UserContext from "../contexts/UserContext";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { notification, setNotification } = useContext(DesignContext);
  const { currentUser, setCurrentUser} = useContext(UserContext)

  const API = axios.create({ baseUrl: baseUrl });

  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [mySongs, setMySongs] = useState([]);

  
  // const [formData, setFormData] = useState({})

   const getAllMyTracks = () => {
    API.get(`${baseUrl}/music/mysongs`, { withCredentials: true})
      .then(response => {
        console.log('my songs', response.data)
        setMySongs(response.data)
      })
  }


  useEffect(() => {
    if(currentUser){
      getAllMyTracks()
    }
  }, [currentUser])

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
      setNotification([...notification, response.data.notification]);
      setCurrentUser(response.data.result)
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

 

  const value = {
    setFileName,
    setSelectedFile,
    submitForm,
    fileName,
    selectedFile,
    handleFileInput,
    submitPicture,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataContext;
