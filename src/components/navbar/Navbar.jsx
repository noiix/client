import React from "react";
import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { MdOutlineDarkMode, MdDarkMode} from 'react-icons/md'
import DesignContext from "../../contexts/DesignContext";

function Navbar() {
  const {currentUser, logout} = useContext(UserContext)
  const {darkMode, toggleMode, displayNav, isDesktop} = useContext(DesignContext)


  return (
    <nav>
      <Link to={"/"}>
        <div>
          <h1 id="logo">nöiX</h1>
        </div>
      </Link>
      {(isDesktop || displayNav) && 
      <>
      <ul>
<<<<<<< HEAD
        {Object.keys(currentUser).length !== 0 &&
=======
        {Object.keys(currentUser).length !== 0 && 
>>>>>>> c6d69b64cac428fd0ff44112f7f88bdb8d1f4bce
        <>      
        <li><NavLink to={"/profile"}>profile</NavLink></li>
        <li><NavLink to={"/chat"}>chat</NavLink></li>
        <li><NavLink to={"/upload"}>upload</NavLink></li>
<<<<<<< HEAD
        <li><NavLink to={"/"} onClick={() => logout} aria-hidden="true" >logout</NavLink></li>
=======
        <li><NavLink to={"/"} onClick={logout}>logout</NavLink></li>
>>>>>>> c6d69b64cac428fd0ff44112f7f88bdb8d1f4bce
        </>
        }
      </ul>
      <NavLink className="mode" onClick={toggleMode}>{darkMode ? <MdOutlineDarkMode/> : <MdDarkMode/>}</NavLink>>
      </>
      }
    </nav>
  );
}

export default Navbar;
