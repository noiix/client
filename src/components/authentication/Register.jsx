import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import React from "react";
import Button from '../UI/button/Button';


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
    <>
      <form className="signupForm">
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={ inputHandler }
          required
        />

        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={ inputHandler }
          required
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={ inputHandler }
          required
        />
      </form>
      <div>
        <Button className="btn" type="submit" value="submit" name="sign up" onSubmit={ createAccount }/>
      </div>
    </>
  );
};

export default Register;
