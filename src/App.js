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
import Favorite from './components/favoriteSongs/Favorite'
import { MdDarkMode } from "react-icons/md";
// import ProfileUpdate from "./components/profile/ProfileUpdate";

function App() {
  const { currentUser } = useContext(UserContext);
  const { notification, setNotification, isDesktop, darkMode } = useContext(DesignContext);

  // useEffect(() => {
  //   axios
  //     .get("https://noix-server.onrender.com")
  //     .then((response) =>
  //       setNotification([...notification, response.data.notification])
  //     );
  //   // eslint-disable-next-line
  // }, []);

  return (
   <div className={`App ${darkMode}`}>
      {!isDesktop && <Navbar/>}
    <div className="main">
      <Routes>
      <Route path='/' element={<Home/>}/>
        {Object.keys(currentUser).length === 0 ?
          <Route path="/" element={<Authentication />} />
          :
          <>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/chat' element={<Chat/>}/>
          <Route path='/upload' element={<Upload/>}/>
          <Route path='/favorite' element={<Favorite/>}/>
          </>
        }
      </Routes>
      {notification && <AlertContainer/>}
      {/* make it visible only for logged in users */}
    </div>
    {isDesktop && <Navbar/>}
    </div>
  );
}

export default App;
