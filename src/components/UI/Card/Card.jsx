import React, { useContext } from 'react'
import { GrPlay } from "react-icons/gr";
import UserContext from "../../../contexts/UserContext";
import DataContext from '../../../contexts/DataContext';


function Card({ user }) {

  const { currentUser, users, setProfile, profile } = useContext(UserContext);
  const { selectedFile, fileName } = useContext(DataContext);
    console.log(currentUser);
    console.log(selectedFile);
    console.log(fileName);
    console.log(users);


  const handlePlay = () => {
    return "play song"
  }

  console.log("Who is the user", user)
  return (
    <div className="card" onClick={() => setProfile(user)}>

      <div className='left-column'>
        <div className="artist-name">
          <div>{user.username}</div>
        </div>
      </div>

      <div className='right-column'>
        <div className="track-pic"></div>
        
        <div className='bottom-column'>
          <div className="play-btn">< GrPlay /></div>
          <div className="track-title" onClick={handlePlay}>Track Title</div>
        </div>
      </div>

    </div>
  )
}

export default Card;