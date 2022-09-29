import React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { IoInvertMode, IoInvertModeOutline} from 'react-icons/io'
import DesignContext from "../../contexts/DesignContext";

function Navbar() {
  const {currentUser} = useContext(UserContext)
  const {darkMode} = useContext(DesignContext)
  return (
    <div>
      {ObjectcurrentUser ? 
      <>      
      <NavLink to={"/profile"}>profile</NavLink>
      <NavLink to={"/chat"}>chat</NavLink>
      <NavLink to={"/upload"}>upload</NavLink>
      {/* <NavLink to={"/"}>logout</NavLink> */}
      </>
      :
      <>
      <NavLink to={"/register"}>sign up</NavLink>
      <NavLink to={"/login"}>login</NavLink>
      </>
      }
      {darkMode ? <IoInvertMode/> : <IoInvertModeOutline/>}
    </div>
  );
}

export default Navbar;
