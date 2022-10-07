import React, {useContext} from "react";
import Authentication from "../authentication/Authentication";
// import { NavLink, Link } from "react-router-dom";
// import UserContext from "../../contexts/UserContext";
// import { MdOutlineDarkMode, MdDarkMode} from 'react-icons/md'
// import DesignContext from "../../contexts/DesignContext";
import DesignContext from "../../contexts/DesignContext";
import UserContext from "../../contexts/UserContext";
import CardList from "../UI/CardList/CardList";


function Home() {
  
  const {isDesktop} = useContext(DesignContext)
  const {currentUser} = useContext(UserContext)

  return (
    <div className="home">
      <div className="home-container">
        {isDesktop &&
          <h1>NÖIX CONNECTS MUSICIANS</h1>
        }
        <h2>explore music, find band members, chat</h2>
        <Authentication />
        { currentUser && <CardList /> }
      </div>
    </div>
  )
}

export default Home