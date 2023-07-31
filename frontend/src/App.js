import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TryLive from './pages/tryLive';
import Home from './pages/home';
import NavBar from './components/navbar';

function App() {
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <Router>
      <div className="App">
        <NavBar
          setSettingsOpen={setSettingsOpen}
        />
        <Routes>
          <Route path="/try-live" 
            element={<TryLive 
              setSettingsOpen={setSettingsOpen}
              settingsOpen={settingsOpen} 
              />} 
          />
          <Route path="/" component={Home} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
