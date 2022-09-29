import React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { MdOutlineDarkMode, MdDarkMode} from 'react-icons/md'
import DesignContext from "../../contexts/DesignContext";

function Navbar() {
  const {currentUser, logout} = useContext(UserContext)
  const {darkMode} = useContext(DesignContext)
  return (
    <nav>
      {Object.keys(currentUser).length !== 0 ? 
      <>      
      <NavLink to={"/profile"}>profile</NavLink>
      <NavLink to={"/chat"}>chat</NavLink>
      <NavLink to={"/upload"}>upload</NavLink>
      <NavLink to={"/"} onClick={logout}>logout</NavLink>
      </>
      :
      <>
      <NavLink to={"/register"}>sign up</NavLink>
      <NavLink to={"/login"}>login</NavLink>
      </>
      }
      {darkMode ? <MdOutlineDarkMode/> : <MdDarkMode/>}
    </nav>
  );
}

export default Navbar;
