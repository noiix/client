import { useContext, useState, useRef, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import React from "react";
// import { NavLink } from "react-router-dom";
import ProfileUpdate from './ProfileUpdate'
import ProfilePic from "./ProfilePic";
import Modal from "../UI/modal/Modal";
import DesignContext from "../../contexts/DesignContext";
import DataContext from '../../contexts/DataContext';
import ChatContext from '../../contexts/ChatContext';
import Upload from "../upload/Upload";
import { GrPlay, GrPause } from "react-icons/gr";
import { AiOutlineDelete } from 'react-icons/ai'
// import {IoIosHeartDislike, IoMdHeartEmpty} from 'react-icons/io';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
// import {RiImageEditFill} from 'react-icons/ri';
import { TbEdit } from 'react-icons/tb'
import { BsPlusLg } from 'react-icons/bs'
import Button from '../UI/button/Button'
import { Link } from 'react-router-dom'


function Profile() {
  const [togglePicBtn, setTogglePicBtn] = useState(false)
  const { toggleModalUpdate, displayModalUpdate, toggleModalAdd, displayModalAdd, displayForm, toggleForm } = useContext(DesignContext)
  const { profile, currentUser, introTextUpdate, setToggleTextBtn, introTextHandler, addContact } = useContext(UserContext)
  const { deleteTrack, likeSongs, duration } = useContext(DataContext)
  const { accessChat } = useContext(ChatContext);
  const [playing, setPlaying] = useState(false);
  const [currentItem, setCurrentItem] = useState(0);


  let url;

  let audioRef = useRef(new Audio(url))

  useEffect(() => {
    console.log('useeffect', profile)

    if (profile) {

      for (let i = 0; i < profile.music.length; i++) {
        url = profile.music[i].path
        console.log('url :', url)

        audioRef.current = new Audio(url)
        console.log('audioref', audioRef.current)
      }
    }

  }, [profile, currentUser])


  const play = (index) => {
    setPlaying(true)
    for (let i = 0; i < profile.music.length; i++) {
      if (i === index) {
        setCurrentItem(index)
        url = profile.music[i].path
        audioRef.current = new Audio(url)
        audioRef.current.play();
      }
    }
  }

  const pause = (index) => {

    setPlaying(false)

    for (let i = 0; i < profile.music.length; i++) {
      if (index === i) {
        setCurrentItem(i)
        audioRef.current.pause();
      }
    }
  }

  function togglePic() {
    setTogglePicBtn(!togglePicBtn)
  }

  console.log('profile liked songs', currentUser.liked_songs)


  return (
    <div className="profile-container">
      { Object.keys(currentUser).length !== 0 && (
        <>
          <div className="profile-left-column">
            <div className="profile-left-column-header">
              <div className="profile-picture-container">
                <img src={ profile?.image } alt="img" className="profile-img" />
                { profile._id === currentUser._id &&
                  <div className="pic-upload-form-container">
                    <div className="profile-picture-update-btn icon" onClick={ toggleForm }><TbEdit /></div>
                    { displayForm && <>
                      <ProfilePic />
                    </> }
                  </div> }
              </div>

              <h3>{ profile.username }</h3>
            </div>

            <div className="profile-info-container">
              <div className="profile-info">
                { profile._id === currentUser._id ?
                  <form className="intro-text-form">
                    <textarea className="intro-text-field" type="text" name="intro_text" defaultValue={ currentUser.intro_text || "Write a short info text about you." } onChange={ introTextHandler }>
                    </textarea>
                    <Button type="submit" name="SUBMIT" onClick={ introTextUpdate } />
                  </form> :
                  <div>{ profile.intro_text }</div> }
                <>
                  {/* {profile._id === currentUser._id && <TbEdit onClick={ () => setToggleTextBtn(true) }/>} */ }
                </>

              </div>


              <div className="profile-info-edit-btn">
                { profile._id === currentUser._id && <button onClick={ toggleModalUpdate }>EDIT PROFILE</button> }
                { displayModalUpdate &&
                  <Modal>
                    <ProfileUpdate />
                  </Modal>
                }
              </div>
            </div>


          </div>
          <div className="profile-right-column">
            <div className="profile-connect-btn-container">
              { profile._id !== currentUser._id && <div className="profile-connect-btn" onClick={ () => accessChat(profile._id) }>
                CONNECT
              </div> }
            </div>
            <div className="profile-track-list">

              <>
                { profile.music.length > 0 ? profile.music.map((track, idx) => (

                  <>
                    <div className="profile-track-line">
                      <div className="profile-play-btn icon-btn" onClick={ playing ? () => pause(idx) : () => play(idx) }>{ currentItem === idx && playing ? <GrPause /> : <GrPlay /> }</div>
                      <div className="profile-track-title">
                        { track.title }
                      </div>
                      <div className="profile-track-duration">
                        { duration(track.duration) }
                      </div>
                      { profile._id === currentUser._id ?
                        <div className="profile-track-delete-btn" onClick={ () => deleteTrack(idx) }><AiOutlineDelete /></div> :
                        <div className="profile-like-track-btn" onClick={ () => likeSongs(idx) }>{ currentUser.liked_songs.includes(track) ? <FaRegHeart /> : <FaHeart /> }</div> }
                    </div>
                  </>)) : (
                  <div class>
                    { currentUser._id !== profile._id ?
                      <p><span>{ profile.username }</span> hasn't uploaded any tracks yet. Do you want to ask them why?</p>
                      :
                      <>
                        <p>The community is curious about your art. Let's upload some tracks.</p>
                      </>
                    }
                  </div>)
                }
                { profile._id === currentUser._id && <div className="profile-track-add-btn icon" onClick={ toggleModalAdd }><BsPlusLg /></div> }
                { displayModalAdd &&
                  <Modal>
                    <Upload />
                  </Modal>
                }
              </>
            </div>
          </div>
        </>

      ) }

    </div>
  );
}

export default Profile;