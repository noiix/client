import React, {useContext, useRef, useEffect, useState} from 'react'
import UserContext from '../../contexts/UserContext'
import DataContext from '../../contexts/DataContext'
import { GrPlay, GrPause } from "react-icons/gr";
import {IoIosHeartDislike, IoMdHeartEmpty} from 'react-icons/io'

function Favorite() {

    const {currentUser, profile} = useContext(UserContext)
    const {likeSongs} = useContext(DataContext);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(0);


    let url_1;
    let url_2;
    let url_3;


  let audioRef1 = useRef(new Audio(url_1))
  let audioRef2 = useRef(new Audio(url_2))
  let audioRef3 = useRef(new Audio(url_3))

  console.log(profile.music.length)

  useEffect(() => {
    console.log('useeffect', profile)
    if(profile) {
      if(profile.music.length !== 0) {
        url_1 = profile.music[0].path
        audioRef1.current = new Audio(url_1)
        // setUrl({...url, url1: profile.music[0].path});
      }
      if(profile.music.length > 1) {
        url_2 = profile.music[1].path
        audioRef2.current = new Audio(url_2)
        //  setUrl({...url, url2: profile.music[1].path});
      }
      if(profile.music.length > 2) {
        url_3 = profile.music[2].path
        audioRef3.current = new Audio(url_3)
        // setUrl({...url, url3: profile.music[2].path});
      }
    }
  }, [profile, currentUser])

  console.log('audioref3', audioRef3.current)

  const play = (index) => {
    if(index === 0){
      setIsPlaying(true);
      setCurrentSong(0)
      audioRef1.current.play();
      audioRef2.current.pause();
      audioRef3.current.pause();
    }
    else if(index === 1){
      setIsPlaying(true);
      setCurrentSong(1);
      audioRef2.current.play();
      audioRef1.current.pause();
      audioRef3.current.pause();
    }
    else if(index === 2){
      setIsPlaying(true);
      setCurrentSong(2);
      audioRef3.current.play();
      audioRef1.current.pause();
      audioRef2.current.pause();
    }
  }

  const pause = (index) => {
    if(index === 0){
      setCurrentSong(0)
      setIsPlaying(false)
      audioRef1.current.pause();
    }
    else if(index === 1){
      setCurrentSong(1)
      setIsPlaying(false)
      audioRef2.current.pause();
    }
    else if(index === 2){
      setCurrentSong(2)
      setIsPlaying(false)
      audioRef3.current.pause();
    }
  }
   
  return (
    <>
    <div>{currentUser.liked_songs.length > 0 && currentUser.liked_songs.map((track, idx) =>
        <div>
        <>
        <div className="profile-track-line">
          <div className="profile-play-btn" onClick={isPlaying ? () => pause(idx) : () => play(idx)}>{currentSong === idx &&  isPlaying ? <GrPause/> : <GrPlay/> }</div>
          <div className="profile-track-title">
          {track.title}
          </div>
            <div className="profile-like-track-btn" onClick={() => likeSongs(idx)}>{currentUser.liked_songs.includes(track) && <IoIosHeartDislike/>}</div>
          </div>
      </>
        </div>)}</div>
    </>
  )
}

export default Favorite