import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import React from "react";
// import { NavLink } from "react-router-dom";
import ProfileUpdate from './ProfileUpdate'
import ProfilePic from "./ProfilePic";
import './profile.styles.scss'
import Modal from "../UI/modal/Modal";
import DesignContext from "../../contexts/DesignContext";
import Upload from "../upload/Upload";

function Profile() {
  const [toggleBtn, setToggleBtn] = useState(false)
  const [togglePicBtn, setTogglePicBtn] = useState(false)

  function toggleUpdate() {
    setToggleBtn(!toggleBtn)
  }
  function togglePic() {
    setTogglePicBtn(!togglePicBtn)
  }
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
          <button onClick={ toggleUpdate }>update profile</button>
          { toggleBtn && <>
            <ProfileUpdate />

          </> }
        </div>

      ) }
    </div>
  );
}

export default Profile;
