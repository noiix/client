import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import React from "react";
import GoogleAuth from "./GoogleAuth";


const Register = () => {
  const {
    inputHandler,
    createAccount,
    currentUser,
    // googleAuthentication,
    // handleSignOut,
  } = useContext(UserContext);

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
        <input type="submit" value="submit" />
      </form>
      <h3>OR</h3>
      <GoogleAuth/>
    </div>
  );
};

export default Register;
