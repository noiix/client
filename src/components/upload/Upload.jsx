import React, { useContext } from 'react'
import FileUploader from './FileUploader'
import axios from "axios";
import Button from '../UI/button/Button';
import DataContext from '../../contexts/DataContext';
import DesignContext from '../../contexts/DesignContext';
import Waiting from '../UI/animations/Waiting'

function Upload() {

  const { fileName, setFileName, submitForm } = useContext(DataContext)
  const { waitingAnimation, darkMode } = useContext(DesignContext)

  return (
    <div className={ darkMode }>
      <form className='track-upload-form'>
        <input type='text' value={ fileName } name={ fileName } required onChange={ (e) => { setFileName(e.target.value) } } accept="audio/*" />
        <FileUploader
        // onFileSelectSuccess={(file) => setSelectedFile(file)}
        // onFileSelectError={({error}) => alert(error)}
        />
        <div className="animation-container">
          { waitingAnimation &&
            <>
              <span>One sec... we are working the magic in the background</span>
              <Waiting />
            </>
          }
        </div>
        <div><Button onClick={ submitForm } name="upload" type="submit" /></div>
      </form>
    </div>
  )
}

export default Upload