import React, { useContext, useState, useCallback } from 'react';
import {Link} from 'react-router-dom';
import Card from '../Card/Card';

import UserContext from "../../../contexts/UserContext";
import baseUrl from '../../../config';

function CardList() {

    const { users, setProfile } = useContext(UserContext);
    const [activePlaying,setActivePlaying]=useState(null);

    const activePlayerhandler = useCallback((id)=>{
      setActivePlaying(id);
    },[]);

  return (
    <div className='card-list'>
            { users && users.map((user, i) => <Link to={"/profile"}><Card key={i} index={i} user={user} onPlay={() =>activePlayerhandler(i)} playTrack={activePlaying===i}/></Link>)}
    </div>
  )
}

export default CardList