import { useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import React from "react";
import jwt_decode from "jwt-decode";

const Register = () => {
  const { inputHandler, createAccount, setCurrentUser, currentUser } =
    useContext(UserContext);

  function handleCallbackResponse(response) {
    // console.log("Encoded JWT ID token" + response.credential);
    const userObject = jwt_decode(response.credential);

    setCurrentUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }
  console.log(currentUser);

  function handleSignOut() {
    setCurrentUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "459142459445-14n3r2veq9lsd6o1shsmkkiaqf72ifhh.apps.googleusercontent.com",

      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "medium",
    });

    // google.accounts.id.prompt();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      Register
      <form className="signupForm" onSubmit={createAccount}>
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={inputHandler}
        />{" "}
        <br />
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={inputHandler}
        />{" "}
        <br />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={inputHandler}
        />{" "}
        <br />
          <input type="submit" value="submit"/>
      </form>
      <div id="signInDiv"></div>
      {Object.keys(currentUser).length !== 0 && (
        <button onClick={(e) => handleSignOut(e)}>sign out</button>
      )}
      {currentUser && (
        <div>
          <img src={currentUser.picture} />
          <h3>{currentUser.name}</h3>
        </div>
      )}
    </div>
  );
};

export default Register;
