import './App.css';
import React, { useState } from 'react';
import UploadAudioPage from './components/uploadAudioPage';
import Analysis from './components/analysis';
import OutPut from './components/outPut';
import NavBar from './components/navbar';
import RecordAudio from './components/recordAudio';
import RadioOptions from './components/radioOptions';
import Settings from './components/settings';


function App() {
  const [outPutAudioUrl, setOutPutAudioUrl] = useState(null)
  const [audioPreviewUrl, setAudioPreviewUrl] = React.useState(null);
  const [file, setFile] = React.useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  // Audio Settings params
  const [settings, setSettings] = useState({ gender : "MALE", inputAccent : "en-US", outputAccent : "en-US"})
  const [audioAnalysis, setAudioAnalysis] = useState({status : null, originalText: null, correctedText: null, confidence: null, pace: null, errors: null, fillers: null})


  return (
    <div className="App">
      <div>
        <NavBar
          setSettingsOpen={setSettingsOpen}
        />
      </div>
      <Settings
        settingsOpen={settingsOpen}
        setSettingsOpen={setSettingsOpen}
        setSettings={setSettings}
        settings={settings}
      />
      <div style={{ paddingTop: 70 }}>
        <UploadAudioPage
          outPutAudioUrl={outPutAudioUrl}
          setOutPutAudioUrl={setOutPutAudioUrl}
          setAudioPreviewUrl={setAudioPreviewUrl}
          audioPreviewUrl={audioPreviewUrl}
          file={file}
          setFile={setFile}
          setIsProcessing={setIsProcessing}
          settings={settings}
          setAudioAnalysis={setAudioAnalysis}
        />
        <OutPut
          outPutAudioUrl={outPutAudioUrl}
          isProcessing={isProcessing}
        />
        <Analysis
          audioAnalysis={audioAnalysis}
        ></Analysis>
      </div>



    </div>

  );
}

export default App;
