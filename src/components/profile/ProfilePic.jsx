import { useEffect } from 'react';
import { useState } from 'react';
import { useRef, useContext } from 'react';
import { FaFileAudio, FaImage, FaRegFileAudio } from 'react-icons/fa';
import DataContext from '../../contexts/DataContext';
import DesignContext from '../../contexts/DesignContext';
import Button from '../UI/button/Button';



const ProfilePic = () => {
  const fileInput = useRef(null)
  const preview = useRef(null)
  const { handleFileInput, selectedFile, submitPicture } = useContext(DataContext)
  const { darkMode, setDisplayForm } = useContext(DesignContext)
 
  const closeForm = () => {
    setDisplayForm(false)
  }

  useEffect(()=> {
      const picPreview = preview.current
      console.log(picPreview)
    }, []) 

  console.log('fileInput', fileInput.value)

  return (
    <div className='pic-upload-form-bg' onClick={closeForm}>
      <form onClick={e => e.stopPropagation()} className="pic-upload-form">
        <input type="file" name='image' onChange={ handleFileInput } ref={ fileInput } className="file-input" accept='image/*' id='profile-pic'/>
        <div onClick={ e => fileInput.current && fileInput.current.click() } className="drag-and-drop">
          {fileInput !== null ? 
            <img id='pic-preview' ref={preview} alt="preview of your profile img"></img> :
           (darkMode ? <FaImage className='drop-icon' /> : <FaImage className='drop-icon' />) 
            }
        </div>
        <div>
          <Button onClick={ submitPicture } name='upload' value="submit" type='submit'/>
        </div>
      </form>
    </div>
  )
}

export default ProfilePic