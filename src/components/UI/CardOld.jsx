import React from 'react'
import { GrPlay } from "react-icons/gr";

function CardOld() {
  return (
    <div className="card-o">

      <div className='left-column-o'>
        <div className="artist-name-o">
          <div>Artist Name</div>
        </div>
      </div>

      <div className='right-column-o'>
        <div className="track-pic-o"></div>
        
        <div className='bottom-column-o'>
          <div className="play-btn-o">< GrPlay /></div>
          <div className="track-title-o">Track Title</div>
        </div>
      </div>

    </div>
  )
}

export default CardOld;