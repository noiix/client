import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import React from "react";
// import { NavLink } from "react-router-dom";
import ProfileUpdate from './ProfileUpdate'
<<<<<<< HEAD
import CardList from '../UI/CardList/CardList'
=======
import ProfilePic from "./ProfilePic";
import './profile.styles.scss'
>>>>>>> bc66b63edb608cc461fe6dc5745294217be2d501

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
    <div className="profile-container">
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

      )}
      <ProfileUpdate/>
      <br />
      {/* Judith's Card: just for testing the Layout */}
      <CardList />
      
    </div>
  );
}

export default Profile;
