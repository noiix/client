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
<<<<<<< HEAD
    <>
      <form className="signupForm" onSubmit={ createAccount }>
=======
    <div>

      <form className="signupForm">
>>>>>>> 7b46b66e85d5a76e4ff143798acda87ae842c68c
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
<<<<<<< HEAD
        />
=======
        />{ " " }
        <br />
        <Button className="btn" type="submit" value="submit" onClick={createAccount} name="sign up"/>
>>>>>>> 7b46b66e85d5a76e4ff143798acda87ae842c68c
      </form>
      <div>
        <Button className="btn" type="submit" value="submit" name="sign up"/>
      </div>
    </>
  );
};

export default Register;
