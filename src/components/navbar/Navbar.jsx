import React from "react";
import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { MdOutlineDarkMode, MdDarkMode } from 'react-icons/md'
import DesignContext from "../../contexts/DesignContext";
import {IoMdClose} from 'react-icons/io';
import {HiOutlineMenuAlt3} from 'react-icons/hi';

function Navbar() {
  const { currentUser, logout } = useContext(UserContext)
  const { darkMode, toggleMode, displayNav, toggleNav, isDesktop } = useContext(DesignContext)


  return (
    <nav>
      <Link to={ "/" }>
        <div>
          <h1 id="logo">nöiX</h1>
        </div>
      </Link>
      {Object.keys(currentUser).length !== 0 && 
        <Link onClick={toggleNav} className="nav-toggle">
          {(!isDesktop && !displayNav) &&
            <HiOutlineMenuAlt3/>
          }
          {(!isDesktop && displayNav) &&
            <IoMdClose/>
          }
        </Link>
      }
      {(isDesktop || displayNav) && 
      <>
      <ul>
        {Object.keys(currentUser).length !== 0 &&
        <>      
        <li><NavLink to={"/profile"}>profile</NavLink></li>
        <li><NavLink to={"/chat"}>chat</NavLink></li>
        <li><NavLink to={"/upload"}>upload</NavLink></li>
        <li><NavLink to={"/"} onClick={logout} >logout</NavLink></li>
        </>
        }
      </ul>
      <NavLink className="mode" onClick={toggleMode}>{darkMode ? <MdOutlineDarkMode/> : <MdDarkMode/>}</NavLink>
      </>
      }
    </nav>
  );
}

export default Navbar;
