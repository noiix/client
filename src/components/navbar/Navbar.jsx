import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div>
      Navbar
      <NavLink to={"/register"}>signup</NavLink>
      <NavLink to={"/login"}>login</NavLink>
      <NavLink to={"/profile"}>profile</NavLink>{" "}
      <NavLink to={"/chat"}>chat</NavLink>{" "}
      <NavLink to={"/upload"}>upload</NavLink>
    </div>
  );
}

export default Navbar;
