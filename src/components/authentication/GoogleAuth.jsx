import React from "react";
import { useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";


const GoogleAuth = () => {

  const { googleAuthentication } = useContext(UserContext);

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "459142459445-14n3r2veq9lsd6o1shsmkkiaqf72ifhh.apps.googleusercontent.com",

      callback: googleAuthentication,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });

    // google.accounts.id.prompt();
    // eslint-disable-next-line
  }, []);



  return (
    <div>
      <div id="signInDiv"></div>
    </div>
  )
}

export default GoogleAuth