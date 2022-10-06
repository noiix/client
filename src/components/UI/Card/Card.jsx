import React, { useContext } from 'react'
import { GrPlay } from "react-icons/gr";
import UserContext from "../../../contexts/UserContext";
import DataContext from '../../../contexts/DataContext';


function Card() {

  const { currentUser } = useContext(UserContext);
  const { selectedFile, fileName } = useContext(DataContext);
    console.log(currentUser);
    console.log(selectedFile);
    console.log(fileName);

  return (
    <div className="card">

      <div className='left-column'>
        <div className="artist-name">
          <div>{currentUser.username}</div>
        </div>
      </div>

      <div className='right-column'>
        <div className="track-pic"></div>
        
        <div className='bottom-column'>
          <div className="play-btn">< GrPlay /></div>
          <div className="track-title">Track Title</div>
        </div>
      </div>

    </div>
  )
}

export default Card;