import { useRef, useContext } from 'react';
import { FaFileAudio, FaImage, FaRegFileAudio } from 'react-icons/fa';
import DataContext from '../../contexts/DataContext';
import DesignContext from '../../contexts/DesignContext';
import Button from '../UI/button/Button';



const ProfilePic = () => {
  const fileInput = useRef(null)
  const { handleFileInput, selectedFile, submitPicture } = useContext(DataContext)
  const { darkMode } = useContext(DesignContext)


  return (
    <div>
      <form>
        <input type="file" name='image' onChange={ handleFileInput } ref={ fileInput } className="file-input" />
        <div onClick={ e => fileInput.current && fileInput.current.click() } className="drag-and-drop">
          { darkMode ? <FaImage className='drop-icon' /> : <FaImage className='drop-icon' /> }
        </div>
        <Button onClick={ submitPicture } name='upload' value="submit" />
      </form>
    </div>
  )
}

export default ProfilePic