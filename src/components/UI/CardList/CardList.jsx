import React, { useContext, useEffect, useState, useRef } from 'react';
import {Link} from 'react-router-dom';
import Card from '../Card/Card';
import UserContext from "../../../contexts/UserContext";
import baseUrl from '../../../config';

function useMultiAudio(users, currentUser) {

  const urls = users && users.map(user => user.music.length > 0 && user.music[0].path);
  const [sources, setSources] = useState(
    () => urls.map(url => {
      return {
        url,
        audio: new Audio(url),
      }
    },
    ))

  // const sources = useRef()
  // const players = useRef()

  const [players, setPlayers] = useState(() =>
    urls.map(url => {
      return {
        url,
        playing: false,
      }
    }),
  )

  // const populateArr = () => {
  //   sources.current = urls.map(url => {
  //     return {
  //       url,
  //       audio: new Audio(url)
  //     }
  //   })
  // }

  // useEffect(() => {
  //   if(Object.keys(currentUser).length > 0) {
  //     populateArr()
  //   }
   
  // }, [currentUser, urls])

  // console.log('sources....', sources.current)

  // const [sources, setSources] = useState()

  // const getUrls = async() => {
  //   const promises = await Promise.all(urls.map(url => {
  //     setSources({url, audio: new Audio(url)});
  //     return promises;
  //   }))

  // }

  // useEffect(() => {
  // if(urls.length > 0) {
  //   setSources(urls)
  //   setPlayers(urls)
  // }
  // }, [urls])
  

  console.log('sources...', sources)

  

  console.log('players', players)

  const toggle = targetIndex => () => {
    const newPlayers = [...players]
    const currentIndex = players.findIndex(p => p.playing === true)
    if (currentIndex !== -1 && currentIndex !== targetIndex) {
      newPlayers[currentIndex].playing = false
      newPlayers[targetIndex].playing = true
    } else if (currentIndex !== -1) {
      newPlayers[targetIndex].playing = false
    } else {
      newPlayers[targetIndex].playing = true
    }
    setPlayers(newPlayers)
    // players.current = newPlayers
  }

  useEffect(() => {
      sources.forEach((source, i) => {
        players[i].playing ? source.audio.play() : source.audio.pause()
      })
  }, [sources, players])

  useEffect(() => {
    console.log('this audio useEffect!!!!')
      sources.forEach((source, i) => {
        source.audio.addEventListener('ended', () => {
          const newPlayers = [...players]
          newPlayers[i].playing = false
          setPlayers(newPlayers)
          // players.current = newPlayers
        })
      })
      return () => {
        sources.forEach((source, i) => {
          source.audio.removeEventListener('ended', () => {
            const newPlayers = [...players]
            newPlayers[i].playing = false
            setPlayers(newPlayers)
            // players.current = newPlayers
          })
        })
        sources.forEach((source, i) => source.audio.pause())
        console.log('this audio useEffect')
      }
    
  }, [])

  return [players, toggle]
  
}



const CardList = () => {

  const { users, currentUser } = useContext(UserContext);
  const [players, toggle] = useMultiAudio(users, currentUser);

  console.log('cardlist players', players)

 

  // console.log('users from card list', users)
 
  return (
    <div className='card-list'>
      { users.length > 0 && users.map((user, i) => (
        <Link to={"/profile"}><Card key={i} player={players[i]} toggle={toggle(i)} user={user}/></Link>
      ))}
    </div>
  )
}

export default CardList