import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import React from "react";
// import { NavLink } from "react-router-dom";
import ProfileUpdate from './ProfileUpdate'
import ProfilePic from "./ProfilePic";

function Profile() {
  const [toggleBtn, setToggleBtn] = useState(false)
  function toggleUpdate() {
    setToggleBtn(!toggleBtn)
  }
  const { currentUser } = useContext(UserContext);
  return (
    <div>
      Profile
      { Object.keys(currentUser).length !== 0 && (
        <div>
          <img src={ currentUser?.image } alt="img" />
          <h3>{ currentUser.username }</h3>
          <button onClick={ toggleUpdate }>update profile</button>
          { toggleBtn ? <>
            <ProfileUpdate />

          </> :
            <>
            </> }
        </div>

      ) }
      <ProfilePic />
    </div>
  );
}

export default Profile;
