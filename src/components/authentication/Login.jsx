import React from "react";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

const Login = () => {
  const { inputHandler, login } = useContext(UserContext);

  return (
    <div>
      login
      <form className="loginForm" onSubmit={login}>
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
          <input type="submit" name="login" value="login"/>
      </form>
    </div>
  );
};

export default Login;
