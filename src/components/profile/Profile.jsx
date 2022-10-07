import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import React from "react";
// import { NavLink } from "react-router-dom";
import ProfileUpdate from './ProfileUpdate'
<<<<<<< HEAD
import Modal from "../UI/modal/Modal";
import DesignContext from "../../contexts/DesignContext";
import Upload from "../upload/Upload";

function Profile() {
  const {toggleModalUpdate, displayModalUpdate, toggleModalAdd, displayModalAdd} = useContext(DesignContext)
 
=======
import ProfilePic from "./ProfilePic";
import './profile.styles.scss'

function Profile() {
  const [toggleBtn, setToggleBtn] = useState(false)
  const [togglePicBtn, setTogglePicBtn] = useState(false)

  function toggleUpdate() {
    setToggleBtn(!toggleBtn)
  }
  function togglePic() {
    setTogglePicBtn(!togglePicBtn)
  }
>>>>>>> bc66b63edb608cc461fe6dc5745294217be2d501
  const { currentUser } = useContext(UserContext);
  return (
    <div>
      Profile
      { Object.keys(currentUser).length !== 0 && (
        <div>
          <img src={ currentUser?.image } alt="img" className="profile-img"/>
          <button onClick={ togglePic }>update pic</button>
          { togglePicBtn && <>
            <ProfilePic />

          </> }
          <h3>{ currentUser.username }</h3>
<<<<<<< HEAD
          <button onClick={ toggleModalUpdate }>update profile</button>
          { displayModalUpdate &&
            <Modal>
              <ProfileUpdate />
            </Modal>
          }

          <button onClick={ toggleModalAdd }>add track</button>
          {displayModalAdd &&
            <Modal>
              <Upload/>
            </Modal>
          }
=======
          <button onClick={ toggleUpdate }>update profile</button>
          { toggleBtn && <>
            <ProfileUpdate />

          </> }
>>>>>>> bc66b63edb608cc461fe6dc5745294217be2d501
        </div>

      ) }
    </div>
  );
}

export default Profile;
