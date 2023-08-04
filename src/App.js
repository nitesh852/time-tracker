import { useState, useEffect } from 'react';
import './App.css';
import Timer from './components/timer';
import SettingsPopup from './components/SettingsPopup';
const ipcRenderer = window.require("electron").ipcRenderer;
function App() {
  const [screenshotsPerMinute, setScreenshotsPerMinute] = useState(5);
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);
  useEffect(() => {
    localStorage.setItem('screenshotsPerMinute', screenshotsPerMinute);
  }, [screenshotsPerMinute]);


  useEffect(() => {
    const savedScreenshotsPerMinute = localStorage.getItem('screenshotsPerMinute');
    if (savedScreenshotsPerMinute) {
      setScreenshotsPerMinute(parseInt(savedScreenshotsPerMinute, 10));
    }
  }, []);

  useEffect(() => {
    // Send a request to the main process to get the screenshotsPerMinute value
    const screenshotsPerMinuteFromMain = ipcRenderer.sendSync('get-screenshots-per-minute', { 'screenshotsPerMinute': localStorage.getItem('screenshotsPerMinute')});
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
      ipcRenderer.send('update-screenshots-per-minute', newScreenshotsPerMinute);
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
