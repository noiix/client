import React from "react";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

const ProfileUpdate = () => {
  const { profileUpdate, inputHandler } = useContext(UserContext);

  return (
    <div>
      ProfileUpdate
      <form className="updateForm" onSubmit={profileUpdate}>
        <input
          type="text"
          name="username"
          placeholder="new username"
          onChange={inputHandler}
        />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};

export default ProfileUpdate;
