import React from 'react'
import { GrPlay } from "react-icons/gr";

function Card() {
  return (
    <div className="grid">
    <div className="card">

      <div className='left-column'>
        <div className="artist-name">
          <div>Artist Name</div>
        </div>
      </div>

      <div className='right-column'>
        <div className="track-pic"></div>
        
        <div className='bottom-column'>
          <div className="play-btn">< GrPlay /></div>
          <div className="track-title">Track Title</div>
        </div>
      </div>

    </div>
    </div>
  )
}

export default Card