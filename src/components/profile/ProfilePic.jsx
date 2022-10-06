import React from 'react'
// const cloudinary = require('cloudinary').v2

const ProfilePic = () => {

  var myWidget = cloudinary.createUploadWidget({
    cloudName: 'deyn8puf8',
    uploadPreset: 'noix_profile'
  }, (error, result) => {
    if (!error && result && result.event === "success") {
      console.log('Done! Here is the image info: ', result.info);
    }
  }
  )


  return (
    <div>
      <button
        id='upload_widget'
        className='cloudinary_button'
      //  onClick={ myWidget.open() }
      >change profile picture</button>
    </div>
  )
}

export default ProfilePic