import React, {useContext} from 'react'
import FileUploader from './FileUploader'
import axios from "axios";
import Button from '../UI/button/Button';
import DataContext from '../../contexts/DataContext'

function Upload() {
 
  const {fileName, setFileName, submitForm} = useContext(DataContext)

  return (
    <>
      <form>
        <input type='text' value={fileName} name={fileName} required onChange={(e) => {setFileName(e.target.value)}}/>  
        <FileUploader
          // onFileSelectSuccess={(file) => setSelectedFile(file)}
          // onFileSelectError={({error}) => alert(error)}
        />
        <Button onClick={submitForm} name="upload" type="submit"/>
      </form>
    </>  
    )
}

export default Upload