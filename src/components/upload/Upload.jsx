import React, {useState} from 'react'
import FileUploader from './FileUploader'
import axios from "axios";
import Button from '../UI/button/Button';

function Upload() {
  const [fileName, setFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null)

  const submitForm = () => {
    const formData = new FormData()
    formData.append('title', fileName)
    formData.append('file', selectedFile);

    axios.post("", formData)
    .then((res) => {
      alert("Track has been successfully uploaded")
    })
  }

  return (
    <>
      <form>
        <input type='text' value={fileName} onChange={(e) => {setFileName(e.target.value)}}/>  
        <FileUploader
          onFileSelectSuccess={(file) => setSelectedFile(file)}
          onFileSelectError={({error}) => alert(error)}
        />
        <Button onClick={submitForm} name="upload"/>
      </form>
    </>  
    )
}

export default Upload