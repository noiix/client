import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import React from "react";


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

      <form className="signupForm" onSubmit={ createAccount }>
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={ inputHandler }
          required
        />{ " " }
        <br />
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={ inputHandler }
          required
        />{ " " }
        <br />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={ inputHandler }
          required
        />{ " " }
        <br />
        <input className="btn" type="submit" value="submit" />
      </form>
    </div>
  );
};

export default Register;
