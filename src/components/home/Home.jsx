import React, { useContext, useState, useEffect } from "react";
import Authentication from "../authentication/Authentication";
import DesignContext from "../../contexts/DesignContext";
import UserContext from "../../contexts/UserContext";
import CardList from "../UI/CardList/CardList";
import Modal from "../UI/modal/Modal";
import Button from "../UI/button/Button";
import './animation/home-animation.styling.scss'
import {ReactComponent as HomeAnimation} from './animation/home_animation.svg'


function Home() {
  const { isDesktop, toggleModal, toggleBtn, displayModal, darkMode } = useContext(DesignContext)
  const { currentUser, users, setProfile } = useContext(UserContext)

  return (
    <div className={ `home ${darkMode}` }>
      <div className="home-container">
      <div className='headline'>
      { isDesktop &&
        <h1>NÖIX CONNECTS MUSICIANS</h1>
      }
      <h2>explore music, find band members, chat</h2>
      </div>
        
      { (Object.keys(currentUser).length === 0 && !toggleBtn) &&
        <div className="login-btn-container">
          <Button onClick={ toggleModal } type="submit" name="Login" />
        </div>
      }
      { (Object.keys(currentUser).length === 0 && displayModal) &&
        <Modal>
          <Authentication />
        </Modal>
      }

      { ((Object.keys(currentUser).length > 0 && users.length > 0) || Object.keys(currentUser).length === 0) ? <CardList/> : 
        <>
          <div className="introduction">
            {/* <div className="home-animation">  
              <HomeAnimation className="home-animation-svg"/>
            </div>
            <div>
              <h3>Welcome to Nöix</h3>
              <p>to find other musicians nearby you need to set your genres in your profile.</p>
              {<Button name="set genres" path="/profile" onClick={() => setProfile(currentUser)}/>}
            </div> */}
          </div>        
        </>
      }


      </div>
    </div>
  )
}

export default Home