import './App.css';
import React, { useState } from 'react';
import UploadAudioPage from './components/uploadAudioPage';
import Analysis from './components/analysis';
import OutPut from './components/outPut';
import NavBar from './components/navbar';


function App() {
  const [outPutAudioUrl, setOutPutAudioUrl] = useState(null)

  return (
    <div className="App">
      <div>
        <NavBar />
      </div>
      <div style={{ paddingTop: 70 }}>
        <UploadAudioPage
          outPutAudioUrl={outPutAudioUrl}
          setOutPutAudioUrl={setOutPutAudioUrl}
        />
        <OutPut
          outPutAudioUrl={outPutAudioUrl}
        />
        <Analysis></Analysis>
      </div>


    </div>

  );
}

export default App;
