import React, { useContext } from "react";
import Authentication from "../authentication/Authentication";
import DesignContext from "../../contexts/DesignContext";
import UserContext from "../../contexts/UserContext";
import CardList from "../UI/CardList/CardList";
import Modal from "../UI/modal/Modal";
import Button from "../UI/button/Button";


function Home() {
  const { isDesktop, toggleModal, toggleBtn, displayModal, darkMode } = useContext(DesignContext)
  const { currentUser, users } = useContext(UserContext)

  return (
    <div className={ `home ${darkMode}` }>
      <div className="home-container">
        { (isDesktop || Object.keys(currentUser).length === 0) &&
          <h1>NÖIX CONNECTS MUSICIANS</h1>
        }
        <h2>explore music, find band members, chat</h2>

        { (Object.keys(currentUser).length > 0) && <CardList /> }

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