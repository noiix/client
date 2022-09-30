import "./style/App.scss";
import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";
import Navbar from "./components/navbar/Navbar";
import Chat from "./components/chat/Chat";
import Upload from "./components/upload/Upload";
import AlertContainer from "./components/UI/alerts/AlertContainer";
import UserContext from "./contexts/UserContext";
import axios from "axios";
import DesignContext from "./contexts/DesignContext";
import Authentication from "./components/authentication/Authentication";

function App() {
  const {currentUser} = useContext(UserContext)
  const {notification, setNotification} = useContext(DesignContext);

  useEffect(()=>{
    axios.get('http://localhost:5001/')
    .then(response => setNotification([...notification, response.data.notification]))
  }, [])

  console.log(notification)


  return (
   <div className="App">
    <div className="main">
      <Routes>
        {Object.keys(currentUser).length === 0 ?
          <Route path="/" element={<Authentication />} />
          :
          <>
          <Route path='/' element={<Home/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/chat' element={<Chat/>}/>
          <Route path='/upload' element={<Upload/>}/>
          </>
        }
      </Routes>
      {/* make it visible only for logged in users */}
    </div>
    <Navbar/>
    {notification && <AlertContainer/>}
    </div>
  );
}

export default App;
