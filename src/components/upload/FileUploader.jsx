import react, {useRef, useContext} from 'react';
import {FaFileAudio} from 'react-icons/fa';
import {FaRegFileAudio} from 'react-icons/fa'
import DesignContext from '../../contexts/DesignContext';
import DataContext from '../../contexts/DataContext';

const FileUploader = ({onFileSelectSuccess, onFileSelectError}) => {
    const fileInput = useRef(null)
    const {darkMode} = useContext(DesignContext)
    const {handleFileInput, selectedFile} = useContext(DataContext)
   

  return (
    <div className='file-uploader'>
      <input type="file" onChange={handleFileInput} ref={fileInput} name='file'/>
      <button onClick={e => fileInput.current && fileInput.current.click()} className="btn">
        {darkMode ? FaRegFileAudio : FaFileAudio}
      </button>
    </div>
  )
  

};

export default FileUploader;