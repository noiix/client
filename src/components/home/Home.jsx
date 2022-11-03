import React, { useContext, useState, useEffect } from "react";
import Authentication from "../authentication/Authentication";
import DesignContext from "../../contexts/DesignContext";
import UserContext from "../../contexts/UserContext";
import CardList from "../UI/CardList/CardList";
import Modal from "../UI/modal/Modal";
import Button from "../UI/button/Button";
import useLocalStorage from 'use-local-storage'


function Home() {
  const { isDesktop, toggleModal, toggleBtn, displayModal, darkMode } = useContext(DesignContext)
  const { currentUser, users } = useContext(UserContext);
  // const [urls, setUrls] = useLocalStorage('urls', [])

  // const getUrls = () => {
  //   const newUrls = users && users.map(user => user.music.length > 0 && user.music[0].path);
  //   setUrls(newUrls)
  // }

  // useEffect(() => {
  //   if(Object.keys(currentUser).length > 0) {
  //     getUrls()
  //   }
  // }, [currentUser])

  return (
    <div className={ `home ${darkMode}` }>
      <div className="home-container">
      <div className='headline'>
      { isDesktop &&
        <h1>NÖIX CONNECTS MUSICIANS</h1>
      }
      <h2>explore music, find band members, chat</h2>
      </div>
        

        { (Object.keys(currentUser).length > 0) && <CardList/> }

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

      </div>
    </div>
  )
}

export default Home