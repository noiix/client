import React, { useContext, useState, useRef } from 'react'
import { GrPlay, GrPause } from "react-icons/gr";
import UserContext from "../../../contexts/UserContext";
import DataContext from '../../../contexts/DataContext';


function Card({ user }) {

  const { currentUser, users, setProfile, profile } = useContext(UserContext);
  const { selectedFile, fileName } = useContext(DataContext);
  const [playing, setPlaying] = useState(false);
    // console.log(currentUser);
    // console.log(selectedFile);
    // console.log(fileName);
    // console.log(users);

  let url;
  if(user.music.length !== 0) {
    url = user.music[0].path
  }
  else {
    url = null
  }

  let audioRef = useRef(new Audio(url))


  const play = () => {
    setPlaying(true);
    audioRef.current.play();
  }

  const pause = () => {
    setPlaying(false);
    audioRef.current.pause();
  }

  return (
    <div className="card" onClick={() => setProfile(user)}>

      <div className='left-column'>
        <div className="artist-name">
          <div>{user.username}</div>
        </div>
      </div>

      <div className='right-column'>
        <div className="track-pic"><img src={user.image}/></div>
        {user.music.length > 0 ? (
          <div className='bottom-column' onClick={e => e.preventDefault()}>
         <div className="play-btn" onClick={playing ? pause : play}> {playing ? <GrPause/> : <GrPlay/> } </div>
          <div className="track-title">
          {user.music.length > 0 && user.music[0].title}
          </div>
        </div>) : (
          <div className='bottom-column'></div>)
      }
      </div>

    </div>
  )
}

export default Card;