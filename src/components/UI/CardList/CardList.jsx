import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import Card from '../Card/Card';

import UserContext from "../../../contexts/UserContext";
import baseUrl from '../../../config';

function CardList() {

    const { users, setProfile } = useContext(UserContext);

  return (
    <div className='card-list'>
            { users && users.map((user, i) => <Link to={"/profile"}><Card user={user}/></Link>)}
    </div>
  )
}

export default CardList