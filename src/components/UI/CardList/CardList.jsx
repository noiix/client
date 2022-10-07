import React, { useContext } from 'react'
import Card from '../Card/Card';

import UserContext from "../../../contexts/UserContext";

function CardList() {

    const { users } = useContext(UserContext);

  return (
    <div className='card-list'>
        <div className="card-list-card">
            { users && users.map(user => <Card user={user} />)}
        </div>
    </div>
  )
}

export default CardList