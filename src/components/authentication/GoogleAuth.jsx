import React from "react";
import { useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import DesignContext from "../../contexts/DesignContext"


const GoogleAuth = () => {

  const { googleAuthentication } = useContext(UserContext);
  const { gMode } = useContext(DesignContext)

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "459142459445-14n3r2veq9lsd6o1shsmkkiaqf72ifhh.apps.googleusercontent.com",

      callback: googleAuthentication,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: gMode,
      size: "medium",
      shape: 'rectangular'
    });

    // google.accounts.id.prompt();
    // eslint-disable-next-line
  }, [gMode]);



  return (
    <>
      <div id='signInDiv'></div>
    </>
  )
}

export default GoogleAuth