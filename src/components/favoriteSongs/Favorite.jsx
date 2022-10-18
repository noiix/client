import React, { useContext, useRef, useEffect, useState } from 'react'
import UserContext from '../../contexts/UserContext'
import DataContext from '../../contexts/DataContext'
import { GrPlay, GrPause } from "react-icons/gr";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { BsDash } from 'react-icons/bs';
import {Link} from 'react-router-dom';

function Favorite({user}) {

  const { currentUser, profile, users } = useContext(UserContext)
  const { dislikeSongs } = useContext(DataContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);

  console.log('currentUser', currentUser);


  let url;

  let audioRef = useRef(new Audio(url))

  useEffect(() => {
    console.log('useeffect', profile)

    if (currentUser) {

      for (let i = 0; i < currentUser.liked_songs.length; i++) {
        url = currentUser.liked_songs[i].path
        console.log('url :', url)

        audioRef.current = new Audio(url)
        console.log('audioref', audioRef.current)
      }
    }

  }, [profile, currentUser])


  const play = (index) => {
    setIsPlaying(true)
    for (let i = 0; i < currentUser.liked_songs.length; i++) {
      if (i === index) {
        setCurrentSong(index)
        url = currentUser.liked_songs[i].path
        audioRef.current = new Audio(url)
        audioRef.current.play();
      }
    }
  }

  const pause = (index) => {

    setIsPlaying(false)

    for (let i = 0; i < currentUser.liked_songs.length; i++) {
      if (index === i) {
        setCurrentSong(i)
        audioRef.current.pause();
      }
    }
  }


  return (
    <>
      <div className="favorite-main">
      <div className="favorite-page-headline">Favorite Songs</div>
        <div className="favorite-container">

        { currentUser.liked_songs.length > 0 && currentUser.liked_songs.map((track, idx) =>
        <div>
          <>
            {console.log('track', track)}
            <Link to={"/profile"}>
              <div className="favorite-track-line">
            <div className="save-play" onClick={e => e.preventDefault()}>
              <div className="favorite-play-btn" onClick={ isPlaying ? () => pause(idx) : () => play(idx) }>{ currentSong === idx && isPlaying ? <GrPause /> : <GrPlay /> }</div>
              </div>
              { users.map(user => user._id === track.artist && 
              <div className="favorite-profile-pic"><img src={ user.image }></img></div> )}
              <div className="favorite-track-line-flex-container">
              <div className="favorite-track-title">
                { track.title }
              </div>
              <div className="favorite-track-dash">
              <BsDash />
              </div>
              { users.map(user =>
                user._id === track.artist &&
                <div className='favorite-track-artist-name' >
                  { user.username }
                </div>
              ) }
              </div>
              <div className="favorite-track-like-btn" onClick={ () => dislikeSongs(idx) }>{ currentUser.liked_songs.includes(track) && <FaHeart /> }</div>

            </div></Link>
          </>
        </div>) }
        </div>
        </div>
    </>
  )
}

export default Favorite