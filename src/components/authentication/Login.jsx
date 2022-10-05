import React from "react";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import DesignContext from "../../contexts/DesignContext";

const Login = () => {
  const { inputHandler, login } = useContext(UserContext);

  return (
    <div>

      <form className="loginForm" onSubmit={ login }>
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
        <input className="btn" type="submit" name="login" value="login" />
      </form>
    </div>
  );
};

export default Login;
