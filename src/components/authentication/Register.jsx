import { useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import React from "react";

const Register = () => {
  const {
    inputHandler,
    createAccount,
    currentUser,
    handleCallbackResponse,
    handleSignOut,
  } = useContext(UserContext);

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

  console.log(currentUser);

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
    </div>
  );
};

export default Register;
