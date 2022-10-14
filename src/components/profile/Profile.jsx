import { useContext, useState, useRef, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import React from "react";
// import { NavLink } from "react-router-dom";
import ProfileUpdate from './ProfileUpdate'
import ProfilePic from "./ProfilePic";
import Modal from "../UI/modal/Modal";
import DesignContext from "../../contexts/DesignContext";
import DataContext from '../../contexts/DataContext';
import Upload from "../upload/Upload";
import { GrPlay, GrPause } from "react-icons/gr";
import { AiOutlineDelete } from 'react-icons/ai'
import { IoIosHeartDislike, IoMdHeartEmpty } from 'react-icons/io'
// import {RiImageEditFill} from 'react-icons/ri';
import { TbEdit } from 'react-icons/tb'
import { BsPlusLg } from 'react-icons/bs'
import Button from '../UI/button/Button'


function Profile() {
  const [togglePicBtn, setTogglePicBtn] = useState(false)
  const { toggleModalUpdate, displayModalUpdate, toggleModalAdd, displayModalAdd, displayForm, toggleForm } = useContext(DesignContext)
  const { profile, currentUser, introTextUpdate, setToggleTextBtn, toggleTextBtn, introTextHandler } = useContext(UserContext)
  const { deleteTrack, likeSongs } = useContext(DataContext)
  const [playing, setPlaying] = useState(false);
  const [currentItem, setCurrentItem] = useState(0);
  // const [url, setUrl] = useState({url1: '', url2: '', url3: ''});

  let url_1;
  let url_2;
  let url_3;

  console.log('liked songs current user', currentUser)


  let audioRef1 = useRef(new Audio(url_1))
  let audioRef2 = useRef(new Audio(url_2))
  let audioRef3 = useRef(new Audio(url_3))

  console.log(profile.music.length)

  useEffect(() => {
    console.log('useeffect', profile)
    if (profile) {
      if (profile.music.length !== 0) {
        url_1 = profile.music[0].path
        audioRef1.current = new Audio(url_1)
        // setUrl({...url, url1: profile.music[0].path});
      }
      if (profile.music.length > 1) {
        url_2 = profile.music[1].path
        audioRef2.current = new Audio(url_2)
        //  setUrl({...url, url2: profile.music[1].path});
      }
      if (profile.music.length > 2) {
        url_3 = profile.music[2].path
        audioRef3.current = new Audio(url_3)
        // setUrl({...url, url3: profile.music[2].path});
      }
    }
  }, [profile, currentUser])

  console.log('audioref3', audioRef3.current)

  const play = (index) => {
    if (index === 0) {
      setPlaying(true);
      setCurrentItem(0)
      audioRef1.current.play();
      audioRef2.current.pause();
      audioRef3.current.pause();
    }
    else if (index === 1) {
      setPlaying(true);
      setCurrentItem(1)
      audioRef2.current.play();
      audioRef1.current.pause();
      audioRef3.current.pause();
    }
    else if (index === 2) {
      setPlaying(true);
      setCurrentItem(2)
      audioRef3.current.play();
      audioRef1.current.pause();
      audioRef2.current.pause();
    }
  }

  const pause = (index) => {
    if (index === 0) {
      setCurrentItem(0)
      setPlaying(false)
      audioRef1.current.pause();
    }
    else if (index === 1) {
      setCurrentItem(1)
      setPlaying(false)
      audioRef2.current.pause();
    }
    else if (index === 2) {
      setCurrentItem(2)
      setPlaying(false)
      audioRef3.current.pause();
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

            <div className="profile-picture-container">
              <img src={ profile?.image } alt="img" className="profile-img" />
              { profile._id === currentUser._id && <div className="profile-picture-update-btn" onClick={ togglePic }><TbEdit /></div> }
              { togglePicBtn && <>
                <ProfilePic />
              </> }
            </div>

            <h3>{ profile.username }</h3>

            <div className="profile-info-container">
              <div className="profile-info">
                { profile._id === currentUser._id ?
                  <form className="intro-text-form">
                    <input type="text" name="intro_text" placeholder={ currentUser.intro_text || "Write a short info text about you." } onChange={ introTextHandler }>
                    </input>
                    <Button type="submit" name="SUBMIT" onClick={ introTextUpdate } />
                  </form> :
                  <div>{ profile.intro_text }</div> }
                <>
                  { profile._id === currentUser._id && <TbEdit onClick={ () => setToggleTextBtn(true) } /> }
                </>

              </div>
              <div className="profile-info-update-btn">
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
              { profile._id !== currentUser._id && <div className="profile-connect-btn">
                CONNECT
              </div> }
            </div>
            <div className="profile-track-list">

              <>
                { profile.music.length > 0 ? profile.music.map((track, idx) => (

                  <>
                    <div className="profile-track-line">
                      <div className="profile-play-btn" onClick={ playing ? () => pause(idx) : () => play(idx) }>{ currentItem === idx && playing ? <GrPause /> : <GrPlay /> }</div>
                      <div className="profile-track-title">
                        { track.title }
                      </div>
                      { profile._id === currentUser._id ?
                        <div className="profile-track-delete-btn" onClick={ () => deleteTrack(idx) }><AiOutlineDelete /></div> :
                        <div className="profile-like-track-btn" onClick={ () => likeSongs(idx) }>{ currentUser.liked_songs.includes(track) ? <IoIosHeartDislike /> : <IoMdHeartEmpty /> }</div> }
                    </div>
                  </>)) : (
                  <div></div>)
                }
                { profile._id === currentUser._id && <div className="profile-track-add-btn" onClick={ toggleModalAdd }><BsPlusLg /></div> }
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