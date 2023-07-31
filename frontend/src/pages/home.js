import React, {useState} from 'react'
import NavBar from '../components/navbar'
import Settings from '../components/settings'

const Home = ({settingsOpen, setSettingsOpen, settings, setSettings}) => {


    return (
        <div>
            <Settings
                settingsOpen={settingsOpen}
                setSettingsOpen={setSettingsOpen}
                setSettings={setSettings}
                settings={settings}
            />
            <div>
                Home
            </div>
        </div>
    )
}

export default Home