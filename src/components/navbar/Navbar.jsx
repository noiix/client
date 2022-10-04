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
        <div>
          <h1 id="logo">nöiX</h1>
        </div>
      </Link>
      <ul>
      {Object.keys(currentUser).length !== 0 ? 
      <>      
      <li><NavLink to={"/profile"}><span></span>profile</NavLink></li>
      <li><NavLink to={"/chat"}><span></span>chat</NavLink></li>
      <li><NavLink to={"/upload"}><span></span>upload</NavLink></li>
      <li><NavLink to={"/"} onClick={logout}><span></span>logout</NavLink></li>
      </>
      :
      <>
      </>
      }
      </ul>
      <NavLink className="mode" onClick={toggleMode}>{darkMode ? <MdOutlineDarkMode/> : <MdDarkMode/>}</NavLink>
    </nav>
  );
}

export default Navbar;
