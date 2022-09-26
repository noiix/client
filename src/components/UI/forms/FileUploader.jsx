import react, {useRef} from 'react';

const FileUploader = () => {
    const fileInput = useRef(null)

    const handleFileInput = (e) => {
      const file = e.target.file[0];
      if (file.size > 1024) {
        onFileSelectError({ error: "File size cannot exceed more than 1MB" });
      } else onFileSelectSucced(file);
    }
  
    return (
      <>
        <input type="file" onChange={handleFileInput} />
        <FileToUpload onFileSelectSucced={setSelectedFile(file)}
        onFileSelectError={err => err}/>
      </>
    )
};

export default FileUploader;