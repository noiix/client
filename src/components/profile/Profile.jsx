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
import { BsDash } from 'react-icons/bs';


function Profile() {
  const [togglePicBtn, setTogglePicBtn] = useState(false)
  const { toggleModalUpdate, displayModalUpdate, toggleModalAdd, displayModalAdd, displayForm, toggleForm, darkMode } = useContext(DesignContext)
  const { profile, currentUser, introTextUpdate, setToggleTextBtn, introTextHandler, addContact, inputHandler, profileUpdateName } = useContext(UserContext)
  const { deleteTrack, likeSongs, duration,
    // playing, setPlaying 
  } = useContext(DataContext)
  const { accessChat, chats } = useContext(ChatContext);
  const [playing, setPlaying] = useState(false);
  const [currentItem, setCurrentItem] = useState(0);
  const [likedSongs, setLikedSongs] = useState([]);
  // const [players, setPlayers] = useState()

  let url;

  let audioRef = useRef(new Audio(url))

  let sources = profile && profile.music.map(track => track.path);

  console.log(sources)

  useEffect(() => {
    const likedSongsId = currentUser.liked_songs.map(item => item._id);
    setLikedSongs(likedSongsId);

    if (profile) {

      for (let i = 0; i < profile.music.length; i++) {
        url = profile.music[i].path

        audioRef.current = new Audio(url)
      }
    }
    return () => {
      audioRef.current.pause()
    }

  }, [profile, currentUser])


  const play = (index, song) => {
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

  return (
    // <div className={ darkMode }>
    <div className={ `profile-container ${darkMode}` }>
      { Object.keys(currentUser).length !== 0 && (
        <>
          <div className="profile-left-column">
            <div className="profile-left-column-header">
              <div className="profile-picture-container">
                <img imageInnerStyle={{opacity: 0.35, backgroundColor: 'red', backgroundBlendMode: 'multiply' }} src={ profile?.image } alt="img" className="profile-img" />
                { profile._id === currentUser._id &&
                  <div className="pic-upload-form-container">
                    <div className="profile-picture-update-btn icon" onClick={ toggleForm }><TbEdit /></div>
                    { displayForm && <>
                      <ProfilePic />
                    </> }
                  </div> }
              </div>

              <div className="profile-header-username">
                <h3>{ profile.username }</h3>
                { profile._id === currentUser._id &&
                  <form className="nameForm">
                    <input onChange={ inputHandler } name="username" placeholder="new name" />
                    <Button type="btn-small" onClick={ profileUpdateName } name="update name" />
                  </form> }
              </div>
            </div>

            <div className="profile-info-container">

              <div className="profile-info-edit-btn">
                { profile._id === currentUser._id && <Button type="submit" name="Genre & Instruments" onClick={ toggleModalUpdate } /> }
                { displayModalUpdate &&
                  <Modal>
                    <ProfileUpdate />
                  </Modal>
                }
              </div>
              <div className="profile-info">
                { profile._id === currentUser._id ?
                  <form className="intro-text-form">
                    <textarea className="intro-text-field" type="text" name="intro_text" defaultValue={ currentUser.intro_text || "Write a short info text about you." } onChange={ introTextHandler }>
                    </textarea>
                    <Button type="submit" name="update" onClick={ introTextUpdate } />
                  </form> :
                  <div><p className="details">{ profile.intro_text }</p></div> }
                <>
                  {/* {profile._id === currentUser._id && <TbEdit onClick={ () => setToggleTextBtn(true) }/>} */ }
                </>

              </div>
            </div>

          </div>
          <div className="profile-right-column">
            <div className="profile-connect-btn-container">
              { profile._id !== currentUser._id &&     
                    <Link to="/chat">
                      <Button type="profile-connect-btn submit" name={"chat"} onClick={ () => accessChat(profile._id) }/>
                    </Link>
               }
            </div>
            <div className="profile-track-list">

              <>
                { profile.music.length > 0 ? profile.music.map((track, idx) => (

                  <>
                    <div className="profile-track-line">
                      <div className="profile-play-btn icon-btn" onClick={ playing ? () => pause(idx) : () => play(idx) }>{ currentItem === idx && playing ? <GrPause /> : <GrPlay /> }</div>
                      <div className="profile-align-container">
                        <div className="profile-track-title">
                          { track.title }
                        </div>
                        <div className="profile-track-duration">
                          { duration(track.duration) }

                        </div>
                      </div>
                      { profile._id === currentUser._id ?
                        <div className="profile-track-delete-btn" onClick={ () => deleteTrack(idx) }><AiOutlineDelete /></div> :
                        <div className="profile-like-track-btn" onClick={ () => likeSongs(idx) }>{ likedSongs.includes(track._id) ? <FaHeart /> : <FaRegHeart /> }</div> }
                    </div>
                  </>)) : (
                  <div className='profile-no-tracks-yet-text'>
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
    // </div>
  );
}

export default Profile;