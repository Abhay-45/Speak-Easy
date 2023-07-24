import './App.css';
import React, {useState} from 'react';
import UploadAudioPage from './components/uploadAudioPage';
import Analysis from './components/analysis';
import OutPut from './components/outPut';



function App() {
  const [outPutAudioUrl, setOutPutAudioUrl] = useState(null)

  return (
    <div className="App">
      <UploadAudioPage 
      outPutAudioUrl={outPutAudioUrl}
      setOutPutAudioUrl={setOutPutAudioUrl}
      />
      <OutPut
      outPutAudioUrl={outPutAudioUrl}
      />
      
    </div>
    
  );
}

export default App;
