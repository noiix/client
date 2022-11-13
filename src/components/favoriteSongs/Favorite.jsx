import React, { useContext, useRef, useEffect, useState } from 'react'
import UserContext from '../../contexts/UserContext'
import DataContext from '../../contexts/DataContext'
import DesignContext from '../../contexts/DesignContext';
import { GrPlay, GrPause } from "react-icons/gr";
import { FaHeart, FaHeartBroken, FaRegHeart } from 'react-icons/fa';
import { BsDash } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Button from '../UI/button/Button';


function Favorite() {

  const { currentUser, profile, users, setProfile } = useContext(UserContext)
  const { dislikeSongs, duration } = useContext(DataContext);
  const { darkMode } = useContext(DesignContext)
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [over, setOver] = useState(false);

  let url;

  let audioRef = useRef(new Audio(url))



  useEffect(() => {
    if (currentUser) {
      for (let i = 0; i < currentUser.liked_songs.length; i++) {
        url = currentUser.liked_songs[i].path
        audioRef.current = new Audio(url)
      }
    }
    return () => {
      audioRef.current.pause()
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
        <div className="favorite-page-headline">
          Favorite Songs
        </div>

        { currentUser.liked_songs.length > 0 ?
          <div className="favorite-container">
            { currentUser.liked_songs.length > 0 && currentUser.liked_songs.map((track, idx) =>
              <div className={ darkMode }>
                <>
                  <div className="favorite-track-line">
                    <div className="save-play" onClick={ e => e.preventDefault() }>
                      <div key={ idx } className="favorite-play-btn" onClick={ isPlaying ? () => pause(idx) : () => play(idx) }>{ currentSong === idx && isPlaying ? <GrPause /> : <GrPlay /> }
                      </div>
                    </div>
                    { users.map(user => user._id === track.artist &&
                      <>
                        <div className='favorite-track-info'>
                          <div className="favorite-profile-pic">
                            <img src={ user.image }></img>
                          </div>
                          <div className="favorite-track-line-flex-container">

                            <Link onClick={ () => setProfile(user) } to={ "/profile" }>
                              <div className='favorite-track-artist-name' >
                                { user.username }
                              </div>
                            </Link>

                            <div className="favorite-track-dash">
                              <BsDash />
                            </div>

                            <div className="favorite-track-title">
                              { track.title }
                            </div>

                            <div className="favorite-track-dash">
                              <BsDash />
                            </div>

                            <div className="favorite-track-duration">
                              { duration(track.duration) }
                            </div>

                          </div>
                        </div>

                        <div key={ idx } className="favorite-track-like-btn icon-btn" title='Remove Track' onMouseOver={ () => setOver({ idx: idx, state: true }) }
                          onMouseOut={ () => setOver({ idx: idx, state: false }) } onClick={ () => dislikeSongs(idx) }>
                          { currentUser.liked_songs.includes(track) && idx === over.idx && over.state ? <FaHeartBroken /> : <FaHeart /> }
                        </div>
                      </>
                    ) }
                  </div>
                </>
              </div>) }
          </div> : 
          <div className='favorite-container'>
          <p>Don't have any songs yet in your favorites? Check out the tracks of nearby musicians and give them a heart if you like them.</p>
          <Link to="/"><Button name="home"/></Link>
          </div>}
      
      </div>
    </>
  )
}

export default Favorite