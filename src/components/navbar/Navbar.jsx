import React from "react";
import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { MdOutlineDarkMode, MdDarkMode} from 'react-icons/md'
import DesignContext from "../../contexts/DesignContext";

function Navbar() {
  const {currentUser, logout} = useContext(UserContext)
  const {darkMode, toggleMode} = useContext(DesignContext)
  return (
    <nav>
      <Link to={"/"}>
        <div className="logo">
          <h1>nöix</h1>
        </div>
      </Link>
      <ul>
      {Object.keys(currentUser).length !== 0  ? 
      <>      
      <li><NavLink to={"/profile"}>profile</NavLink></li>
      <li><NavLink to={"/chat"}>chat</NavLink></li>
      <li><NavLink to={"/"} onClick={logout}>logout</NavLink></li>
      <li><NavLink to={"/upload"}>upload</NavLink></li>
      </>
      :
      <>
      </>
      }
      <NavLink onClick={toggleMode}>{darkMode ? <MdOutlineDarkMode/> : <MdDarkMode/>}</NavLink>
      </ul>
    </nav>
  );
}

export default Navbar;
