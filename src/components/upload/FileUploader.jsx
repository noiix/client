import react, {useRef} from 'react';

const FileUploader = ({onFileSelectSuccess, onFileSelectError}) => {
    const fileInput = useRef(null)
   

    const handleFileInput = (e) => {
      const file = e.target.file[0];
      if (file.size > 1024) 
        onFileSelectError({error: "File size cannot exceed more than 1MB" });
      else 
        onFileSelectSuccess(file);
    }

  return (
    <div className='file-uploader'>
      <input type="file" onChange={handleFileInput}/>
      <button onClick={e => fileInput.current && fileInput.current.click()} className="btn btn-primary"/>
    </div>
  )
  

};

export default FileUploader;