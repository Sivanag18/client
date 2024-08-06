import { useRef, useState, useEffect } from 'react';
import bg from './bg1.jpg';
import './App.css';
import { uploadFile } from './services/api';


function App() {
  const[file, setFile] = useState('');
  const[result, setResult] = useState('');

  const fileInputRef = useRef();

  useEffect (()=> {
    const getImage = async () => {
        if(file) {
          const data = new FormData();
          data.append("name", file.name);
          data.append("file", file);

        let response =  await uploadFile(data);
        setResult(response.path);
        }

    }
    getImage();
  }, [file])
  const onUploadClick = ()=>{
    fileInputRef.current.click();
  }

  console.log(file);
  return (
   <div className='container'>
    <img src = {bg} alt="banner" />
    <div className='wrapper'>
      <h1>Simple File Sharing </h1>
      <p>Upload and share the download link. </p>

      <button  onClick={()=> onUploadClick() }>Upload</button>
      <input type="file" 
        ref={fileInputRef}
        style={{display: 'none'}}
        onChange={(e)=> setFile(e.target.files[0]) }
      />

      <a href={result} target='_blank'>{result}</a>

    </div>
   </div>
  );
}

export default App;
