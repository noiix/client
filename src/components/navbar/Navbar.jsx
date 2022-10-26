import React from "react";
import { useContext, useState, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { MdOutlineDarkMode, MdDarkMode } from 'react-icons/md'
import DesignContext from "../../contexts/DesignContext";
import DataContext from "../../contexts/DataContext";
import { IoMdClose } from 'react-icons/io';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { BsSun } from 'react-icons/bs';
import Search from '../../components/search/Search';
import { ImSearch } from 'react-icons/im';
import ChatContext from '../../contexts/ChatContext'

function Navbar() {
  const { currentUser, logout, setProfile, users } = useContext(UserContext)
  const { darkMode, toggleMode, displayNav, toggleNav, isDesktop } = useContext(DesignContext)
  const { displaySearch, setDisplaySearch } = useContext(DataContext)
  const {chatNotification, setChatNotification, getSender, setSelectedChat, unreadCounter, setMessageToRead} = useContext(ChatContext)

  const toggleSearch = () => {
    setDisplaySearch(!displaySearch);
  }

  const newNotification = useRef(0)



  return (
    <div className={ darkMode }>
      <div className="search-bar-container">
        { displaySearch && <Search className="search-bar" /> }
      </div>
      <nav>
        <Link to={ "/" } onClick={() => setSelectedChat("")}>
          <div>
            <h1 id="logo">nöiX</h1>
          </div>
        </Link>
        { Object.keys(currentUser).length !== 0 &&
          <Link onClick={ () => {toggleNav(); setSelectedChat("") }} className={ `nav-toggle ${darkMode}`}>
            { (!isDesktop && !displayNav) &&
              <HiOutlineMenuAlt3 />
            }
            { (!isDesktop && displayNav) &&
              <IoMdClose />
            }
          </Link>
        }
        { (isDesktop || displayNav) &&
          <>
            { Object.keys(currentUser).length !== 0 &&
              <ul>
                <li><NavLink to={ `/profile` } onClick={ () => {setProfile(currentUser); setSelectedChat("")} }>profile</NavLink></li>
                <li><NavLink to={ "/chat" } onClick={() => {
                  chatNotification.length > 0 && 
                  setSelectedChat(chatNotification[chatNotification.length -1].chat);
                  setChatNotification(chatNotification.filter((n, i) => i === chatNotification.length -1))}}
                  >chat
                  <span>{chatNotification.length > 0 && chatNotification.length}</span>
                </NavLink></li>
                <li><NavLink to={ "/favorite" } onClick={() => setSelectedChat("")}>favorites</NavLink></li>
                <li><NavLink to={ "/" } onClick={ () => {logout(); setSelectedChat("") }} >logout</NavLink></li>

              </ul>
            }
            { Object.keys(currentUser).length !== 0 && <span className="search-btn icon-btn" onClick={ toggleSearch }><ImSearch /></span> }
            <NavLink className="mode" onClick={ toggleMode }>{ darkMode === 'light' ? <MdOutlineDarkMode /> : <BsSun /> }</NavLink>
          </>
        }
      </nav>
    </div>
  );
}

export default Navbar;
