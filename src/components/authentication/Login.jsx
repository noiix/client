import React from "react";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import Button from '../UI/button/Button';

const Login = () => {
  const { inputHandler, login } = useContext(UserContext);


  return (
    <>
      <form className="loginForm" onSubmit={ login }>
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
        <Button className="btn" type="submit" name="login" value="login" onClick={login}/>
      </div>
    </>
  );
};

export default Login;
