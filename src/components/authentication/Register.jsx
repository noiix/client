import React from "react";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [message, setMessage] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const sendToBackend = () => {
    setMessage(`
    verification email sent!
`);
    const data = {
      username,
      email,
      password,
    };
    console.log(data);
    axios
      .post("http://localhost:5001/user/create", data)
      .then((response) => console.log(response));
  };

  return (
    <div>
      Register
      <div className="signupForm">
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />{" "}
        <br />
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />{" "}
        <br />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />{" "}
        <br />
        <div>
          <button type="button" onClick={sendToBackend}>
            send
          </button>
        </div>
      </div>
      {/* <div>{message}</div> */}
    </div>
  );
};

export default Register;
