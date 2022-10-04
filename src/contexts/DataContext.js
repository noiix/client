import React, {createContext, useState} from 'react';
import axios from 'axios'
import baseUrl from '../config'


const DataContext = createContext();

export const DataProvider = ({children}) => {

    const API = axios.create({baseUrl: baseUrl});

  API.interceptors.request.use(
    req => {
      req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
      return req;
    },
    error => {
      return Promise.reject(error);
    }
  )

  const [file, setFile] = useState({})

  const uploadMusic = (e) => {
    e.preventDefault();
    API.post(`${baseUrl}/music/upload`)
    
  }

    const value = {}

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export default DataContext;