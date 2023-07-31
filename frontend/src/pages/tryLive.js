import React, { useState} from 'react';
import UploadAudioPage from '../components/uploadAudioPage';
import Analysis from '../components/analysis';
import OutPut from '../components/outPut';

import Settings from '../components/settings';

const TryLive = ({settingsOpen, setSettingsOpen, settings, setSettings}) => {
    const [outPutAudioUrl, setOutPutAudioUrl] = useState(null)
    const [audioPreviewUrl, setAudioPreviewUrl] = React.useState(null);
    const [file, setFile] = React.useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [audioAnalysis, setAudioAnalysis] = useState({ status: null, originalText: "NA", correctedText: "NA", confidence: 0, pace: 0, errors: 0, fillers: 0, paceAnalysis: ["NA", "NA"], confidenceAnalysis: ["NA", "NA"], errorsAnalysis: ["NA", "NA"], fillersAnalysis: ["NA", "NA"] })


    return (
        <div >
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
                    setSettingsOpen={setSettingsOpen}
                />
                <Analysis
                    audioAnalysis={audioAnalysis}
                ></Analysis>
            </div>



        </div>

    );
}

export default TryLive