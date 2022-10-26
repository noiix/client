import { useEffect } from 'react';
import { useState } from 'react';
import { useRef, useContext } from 'react';
import { FaFileAudio, FaImage, FaRegFileAudio } from 'react-icons/fa';
import DataContext from '../../contexts/DataContext';
import DesignContext from '../../contexts/DesignContext';
import Button from '../UI/button/Button';



const ProfilePic = () => {
  const fileInput = useRef(null)
  const [preview, setPreview] = useState(null)
  const { handleFileInput, selectedFile, submitPicture } = useContext(DataContext)
  const { darkMode, setDisplayForm } = useContext(DesignContext)

  const closeForm = () => {
    setDisplayForm(false)
  }

  const showPreview = (e) => {
    setPreview({ image: URL.createObjectURL(e.target.files[0]) })
  }

  return (
    <div className={ `pic-upload-form-bg ${darkMode}` } onClick={ closeForm }>
      <form onClick={ e => e.stopPropagation() } className="pic-upload-form">
        <input type="file" name='image' onChange={ e => { showPreview(e); handleFileInput(e) } } ref={ fileInput } className="file-input" accept='image/*' id='profile-pic' />
        <div onClick={ e => fileInput.current && fileInput.current.click() } className="drag-and-drop">
          { preview ?
            <img id='pic-preview' src={ preview.image } alt="preview of your profile img" /> :
            (darkMode ? <FaImage className='drop-icon' /> : <FaImage className='drop-icon' />)
          }
        </div>
        <div>
          <Button onClick={ submitPicture } name='upload' value="submit" type='submit' />
        </div>
      </form>
    </div>
  )
}

export default ProfilePic