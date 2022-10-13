import React from "react";
import { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { MdOutlineDarkMode, MdDarkMode } from 'react-icons/md'
import DesignContext from "../../contexts/DesignContext";
import {IoMdClose} from 'react-icons/io';
import {HiOutlineMenuAlt3} from 'react-icons/hi';
import Search from '../../components/search/Search';
import {ImSearch} from 'react-icons/im';

function Navbar() {
  const { currentUser, logout, setProfile, users} = useContext(UserContext)
  const { darkMode, toggleMode, displayNav, toggleNav, isDesktop } = useContext(DesignContext)

  const [displaySearch, setDisplaySearch] = useState(false);

  const toggleSearch = () => {
    setDisplaySearch(!displaySearch);
  }



  return (
  <>
  <div className="search-bar-container">
    {displaySearch && <Search  action={toggleSearch}/>}
  </div>
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
      {Object.keys(currentUser).length !== 0 &&
        <ul>
          <li><NavLink to={`/profile`} onClick={() => setProfile(currentUser)}>profile</NavLink></li>
          <li><NavLink to={"/chat"}>chat</NavLink></li>
          <li><NavLink to={"/favorite"}>favorites</NavLink></li>
          <li><NavLink to={"/"} onClick={logout} >logout</NavLink></li>
          
        </ul>
      }
      {Object.keys(currentUser).length !== 0 && <span className="search-btn"onClick={toggleSearch}><ImSearch /></span>}
      <NavLink className="mode" onClick={toggleMode}>{darkMode ? <MdOutlineDarkMode/> : <MdDarkMode/>}</NavLink>
      </>
      }
    </nav>
    </>
  );
}

export default Navbar;
