import { useContext, useState, useRef } from "react";
import UserContext from "../../contexts/UserContext";
import React from "react";
// import { NavLink } from "react-router-dom";
import ProfileUpdate from './ProfileUpdate'
import ProfilePic from "./ProfilePic";
import './profile.styles.scss'
import Modal from "../UI/modal/Modal";
import DesignContext from "../../contexts/DesignContext";
import Upload from "../upload/Upload";
import { GrPlay, GrPause } from "react-icons/gr";
import {AiOutlineDelete} from 'react-icons/ai'

function Profile() {
  const [toggleBtn, setToggleBtn] = useState(false)
  const [togglePicBtn, setTogglePicBtn] = useState(false)
  const {toggleModalUpdate, displayModalUpdate, toggleModalAdd, displayModalAdd} = useContext(DesignContext)
  const {profile, currentUser} = useContext(UserContext)
  const [playing, setPlaying] = useState(false);
 

  let url_1;
  let url_2;
  let url_3;

  if(profile.music.length !== 0) {
    url_1 = profile.music[0].path;
  }
  else {
    url_1 = null;
  }

  if(profile.music.length > 1) {
    url_2 = profile.music[1].path;
  }
  else {
    url_2 = null;
  }

  console.log('music profile', profile)

  let audioRef1 = useRef(new Audio(url_1))
  let audioRef2 = useRef(new Audio(url_2))


  const play = (index) => {
    if(index === 0){
      setPlaying(true);
      audioRef1.current.play();
    }
    else if(index === 1){
      setPlaying(true);
      audioRef2.current.play();
    }
    
  }

  const pause = (index) => {
    if(index === 0){
      setPlaying(false)
      audioRef1.current.pause();
    }
    else if(index === 1){
      setPlaying(false)
      audioRef2.current.pause();
    }
  }

  function togglePic() {
    setTogglePicBtn(!togglePicBtn)
  }
  console.log('profile', profile)

  return (
    <div className="profile-container">
      Profile
      { Object.keys(currentUser).length !== 0 && (
        <div>
          <img src={ profile?.image } alt="img" className="profile-img"/>
          <button onClick={ togglePic }>update pic</button>
          { togglePicBtn && <>
            <ProfilePic />

          </> }
          <h3>{ profile.username }</h3>
          <div>
          {profile.music.length > 0 ? profile.music.map((track, idx) => (
            <div className='bottom-column'>
              <div className="play-btn" onClick={playing ? () => pause(idx) : () => play(idx)}>{playing ? <GrPause/> : <GrPlay/> }</div>
              <div className="track-title">
              {track.title}
              </div>
          </div>)) : (
            <div className='bottom-column'></div>)
        }
          </div>
          <button onClick={ toggleModalUpdate }>update profile</button>
          { displayModalUpdate &&
            <Modal>
              <ProfileUpdate />
            </Modal>
          }

          <button onClick={ toggleModalAdd }>add track</button>
          {displayModalAdd &&
            <Modal>
              <Upload/>
            </Modal>
          }
        </div>



      )}
    </div>
  );
}

export default Profile;
