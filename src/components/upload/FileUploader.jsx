import react, { useRef, useContext, useState } from 'react';
import { FaFileAudio } from 'react-icons/fa';
import { FaRegFileAudio } from 'react-icons/fa'
import DesignContext from '../../contexts/DesignContext';
import DataContext from '../../contexts/DataContext';

const FileUploader = ({ onFileSelectSuccess, onFileSelectError }) => {
  const fileInput = useRef(null)
  const { darkMode } = useContext(DesignContext)
  const { handleFileInput, selectedFile } = useContext(DataContext)
  const [preview, setPreview] = useState(null)

 

  return (
    <div className='file-uploader'>
      <input type="file" onChange={ e => { handleFileInput(e); setPreview(true)} } required ref={ fileInput } className="file-input" />
      <div onClick={ () => fileInput.current && fileInput.current.click() } className="drag-and-drop">
        {preview ? 
        <p>{fileInput.current.files[0].name}</p> :
        darkMode ? <FaRegFileAudio className='drop-icon'/> : <FaFileAudio className='drop-icon'/> 
        }
      </div>
    </div>
  )


};

export default FileUploader;