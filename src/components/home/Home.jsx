import React from "react";
import bgImage from "../../img/bg-light-home.png"
import Authentication from "../authentication/Authentication";
// import { useContext } from "react";
// import { NavLink, Link } from "react-router-dom";
// import UserContext from "../../contexts/UserContext";
// import { MdOutlineDarkMode, MdDarkMode} from 'react-icons/md'
// import DesignContext from "../../contexts/DesignContext";

function Home() {

  return (
    <div className="home">
      <div className="home-container">
        <h1>NÖIX CONNECTS MUSICIANS</h1>
        <h2>explore music, find band members, chat</h2>
        <Authentication />
      </div>
    </div>
  )
}

export default Home