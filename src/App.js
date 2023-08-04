import { useState, useEffect } from 'react';
import './App.css';
import Timer from './components/timer';
import SettingsPopup from './components/SettingsPopup';
import { ipcRenderer } from 'electron'; // Import ipcRenderer
// const { ipcRenderer } = window.require('electron');


function App() {
  const [screenshotsPerMinute, setScreenshotsPerMinute] = useState(5);
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);
  useEffect(() => {
    localStorage.setItem('screenshotsPerMinute', screenshotsPerMinute.toString());
  }, [screenshotsPerMinute]);

  
  useEffect(() => {
    const savedScreenshotsPerMinute = localStorage.getItem('screenshotsPerMinute');
    if (savedScreenshotsPerMinute) {
      setScreenshotsPerMinute(parseInt(savedScreenshotsPerMinute, 10));
    }
  }, []);

  useEffect(() => {
    // Send a request to the main process to get the screenshotsPerMinute value
    const screenshotsPerMinuteFromMain = ipcRenderer.sendSync('get-screenshots-per-minute');
    setScreenshotsPerMinute(screenshotsPerMinuteFromMain);
  }, []);


  const handleShowSettingsPopup = () => {
    setShowSettingsPopup(true);
  };

  

  const handleSettingsClose = (newScreenshotsPerMinute) => {
    setShowSettingsPopup(false);
    if (newScreenshotsPerMinute !== undefined) {
      setScreenshotsPerMinute(newScreenshotsPerMinute);
      // Send the updated screenshotsPerMinute value to the main process using IPC
      window.ipcRenderer.send('update-screenshots-per-minute', newScreenshotsPerMinute);
    }
  };

  return (
    <div className="App">
      
  <Timer />
  {showSettingsPopup && (
        <SettingsPopup
          onClose={handleSettingsClose}
          currentScreenshotsPerMinute={screenshotsPerMinute}
        />
      )}
  <button onClick={handleShowSettingsPopup}>Open Settings</button>

    </div>
  );
}

export default App;
