import react, {useRef, useContext} from 'react';
import {FaFileAudio} from 'react-icons/fa';
import {FaRegFileAudio} from 'react-icons/fa'
import DesignContext from '../../contexts/DesignContext';

const FileUploader = ({onFileSelectSuccess, onFileSelectError}) => {
    const fileInput = useRef(null)
    const {darkMode} = useContext(DesignContext)
   

    const handleFileInput = (e) => {
      const file = e.target.file[0];
      if (file.size > 1024) 
        onFileSelectError({error: "File size cannot exceed more than 1MB" });
      else 
        onFileSelectSuccess(file);
    }

  return (
    <div className='file-uploader'>
      <input type="file" onChange={handleFileInput} ref={fileInput} className="file-input"/>
      <div onClick={e => fileInput.current && fileInput.current.click()} className="drag-and-drop">
        {darkMode ? <FaRegFileAudio className='drop-icon'/> : <FaFileAudio className='drop-icon'/>}
      </div>
    </div>
  )
  

};

export default FileUploader;