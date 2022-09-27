import React from "react";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

const Login = () => {
  const { inputHandler, login } = useContext(UserContext);

  return (
    <div>
      login
      <div className="loginForm">
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
          <button type="button" onClick={login}>
            login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
