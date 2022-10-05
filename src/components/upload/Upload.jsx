import React, {useContext} from 'react'
import FileUploader from './FileUploader'
import axios from "axios";
import DataContext from '../../contexts/DataContext'

function Upload() {
 
  const {fileName, setFileName, submitForm} = useContext(DataContext)

  return (
    <>
      <form>
        <input type='text' value={fileName} name={fileName} onChange={(e) => {setFileName(e.target.value)}}/>  
        <FileUploader
          // onFileSelectSuccess={(file) => setSelectedFile(file)}
          // onFileSelectError={({error}) => alert(error)}
        />
        <button onClick={submitForm}>upload</button>
      </form>
    </>  
    )
}

export default Upload