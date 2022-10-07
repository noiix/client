import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import React from "react";
// import { NavLink } from "react-router-dom";
import ProfileUpdate from './ProfileUpdate'
import Modal from "../UI/modal/Modal";
import DesignContext from "../../contexts/DesignContext";
import Upload from "../upload/Upload";

function Profile() {
  const {toggleModalUpdate, displayModalUpdate, toggleModalAdd, displayModalAdd} = useContext(DesignContext)
 
  const { currentUser } = useContext(UserContext);
  return (
    <div>
      Profile
      { Object.keys(currentUser).length !== 0 && (
        <div>
          <img src={ currentUser?.image } alt="img" />
          <h3>{ currentUser.username }</h3>
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
        </div>

      ) }
    </div>
  );
}

export default Profile;
