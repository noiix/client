import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import React from "react";

const Register = () => {
  const { inputHandler, createAccount } = useContext(UserContext);

  return (
    <div>
      Register
      <div className="signupForm">
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
        <div>
          <button type="button" onClick={createAccount}>
            send
          </button>
        </div>
      </div>
      {/* <div>{message}</div> */}
    </div>
  );
};

export default Register;
