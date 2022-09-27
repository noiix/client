import './style/App.scss';
import { useContext, useEffect } from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './components/home/Home'
import Profile from './components/profile/Profile'
import Navbar from './components/navbar/Navbar'
import Chat from './components/chat/Chat'
import Upload from './components/upload/Upload';
import AlertContainer from './components/UI/alerts/AlertContainer';
import UserContext from './contexts/UserContext';
import axios from 'axios';


function App() {
  const {notification, setNotification} = useContext(UserContext);

  useEffect(()=>{
    axios.get('http://localhost:5001/')
    .then(response => setNotification(response.data.notification))
  }, [])
  return (
    <div className="App">
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/chat' element={<Chat/>}/>
      <Route path='/upload' element={<Upload/>}/>
    </Routes>
    {/* make it visible only for logged in users */}
    <Navbar/>
    
    {notification && <AlertContainer type={notification.type} title={notification.title}/>}
    </div>
  );
}

export default App;
