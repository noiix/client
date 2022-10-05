import React, {createContext, useState, useContext} from 'react';
import axios from 'axios'
import baseUrl from '../config'
import DesignContext from '../contexts/DesignContext'

const DataContext = createContext();

export const DataProvider = ({children}) => {

  const {notification, setNotification} = useContext(DesignContext)

    const API = axios.create({baseUrl: baseUrl});

    const [fileName, setFileName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null)
  
    const [formData, setFormData] = useState({})
  
    const submitForm = (e) => {
      e.preventDefault();
      const formData = new FormData()
      formData.title =  fileName;
      formData.file = selectedFile;


      // setFormData({...formData, title: fileName, file: selectedFile})

      console.log('onsubmit', formData);
  
      API.post(`${baseUrl}/music/upload`, formData, {withCredentials: true, 'Content-Type': 'multipart/form-data'})
      .then((response) => {
        setNotification([...notification, response.data.notification])
        console.log('response', response)
      })
    }

    const handleFileInput = (e) => {
      // console.log('file', e.target.name)
      const file = e.target.files[0];
      console.log('file', file)
      setSelectedFile(file);
    }

    const value = {setFileName, setSelectedFile, submitForm, fileName, selectedFile, handleFileInput}

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export default DataContext;