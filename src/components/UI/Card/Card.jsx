import React, { useContext, useState, useRef, useEffect } from 'react'
import { GrPlay, GrPause } from "react-icons/gr";
import UserContext from "../../../contexts/UserContext";
import DataContext from '../../../contexts/DataContext';


function Card({ player, toggle, user }) {

  const {setProfile} = useContext(UserContext);

  console.log(user)
  console.log('users', user)

  const checkUserNameLength = () => {
    if(user.username.length > 14 && user.username.length < 17) {
      return 'font-size-s'
    } else if (user.username.length > 17) {
      return 'font-size-xs'
    }
  }
if(user) {
  return (
    <div className="card" onClick={() => setProfile(user)}>

      <div className='card-left-column'>
        <div className={ `${checkUserNameLength()} card-artist-name`}>
          <div>{user.username}</div>
        </div>
      </div>

      <div className='card-right-column'>
        <div className="card-track-pic"><img src={user.image}/></div>
        {user.music.length > 0 ? (
          <div className='card-bottom-column' onClick={e => e.preventDefault()}>
         <div className="play-btn" onClick={toggle}> {player?.playing ? <GrPause/> : <GrPlay/> } </div>
          <div className="card-track-title">
          {user.music.length > 0 && user.music[0].title}
          </div>
        </div>) : (
          <div className='card-bottom-column'></div>)
      }
      </div>

    </div>
  )
}
}

export default Card;