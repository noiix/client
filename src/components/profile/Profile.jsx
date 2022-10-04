import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import React from "react";
import { NavLink } from "react-router-dom";

function Profile() {
  const { currentUser } = useContext(UserContext);
  return (
    <div>
      Profile
      {Object.keys(currentUser).length !== 0 && (
        <div>
          <img src={currentUser?.image} alt="img" />
          <h3>{currentUser.username}</h3>
        </div>
      )}
      <NavLink to={"/profileupdate"}>edit profile</NavLink>
    </div>
  );
}

export default Profile;
