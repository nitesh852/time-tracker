import React, { useState, useEffect } from 'react';
import SettingsPopup from './SettingsPopup';
import { AiOutlineSetting } from 'react-icons/ai';
const ipcRenderer = window.require("electron").ipcRenderer;



const SettingsIcon = () =>{
const [screenshotsPerMinute, setScreenshotsPerMinute] = useState(5);
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);

  useEffect(() => {
    localStorage.setItem('screenshotsPerMinute', screenshotsPerMinute);
  }, [screenshotsPerMinute]);

//   useEffect(() => {
//     // Send a request to the main process to get the screenshotsPerMinute value
//     const screenshotsPerMinuteFromMain = ipcRenderer.sendSync('get-screenshots-per-minute', { 'screenshotsPerMinute': localStorage.getItem('screenshotsPerMinute') });
//     setScreenshotsPerMinute(screenshotsPerMinuteFromMain);
//   }, []);

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
    <div>
        <button onClick={handleShowSettingsPopup}><AiOutlineSetting /></button>
        {showSettingsPopup && (
        <SettingsPopup
          onClose={handleSettingsClose}
          currentScreenshotsPerMinute={screenshotsPerMinute}
          setScreenshotsPerMinute={setScreenshotsPerMinute} // Pass the setter function to SettingsPopup
        />
      )}
    </div>
  )

}

export default SettingsIcon;