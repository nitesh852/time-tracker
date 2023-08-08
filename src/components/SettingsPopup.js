import React, { useState } from 'react';

function SettingsPopup({ onClose, currentScreenshotsPerMinute }) {
  const [newScreenshotsPerMinute, setNewScreenshotsPerMinute] = useState(
    currentScreenshotsPerMinute
  );
 

 

  // Function to handle the user changing the screenshots per minute value
  const handleScreenshotsPerMinuteChange = (event) => {
    setNewScreenshotsPerMinute(parseInt(event.target.value, 10));

  };

  // Function to save the new screenshots per minute value and close the popup
  const handleSaveSettings = () => {
    onClose(newScreenshotsPerMinute);
  };

  // Function to close the popup without saving changes
  const handleCancelSettings = () => {
    onClose();
  };

  return (
    <div>
      <h2>Settings</h2>
      <p>Screenshots per minute:</p>
      <input
        type="range"
        min={1}
        max={10}
        value={newScreenshotsPerMinute}
        onChange={handleScreenshotsPerMinuteChange}
      />
      <p>{newScreenshotsPerMinute}</p>
      <button onClick={handleSaveSettings}>Save</button>
      <button onClick={handleCancelSettings}>Cancel</button>
    </div>
  );
}

export default SettingsPopup;

// import React, { useState } from 'react';
// import { AiOutlineClose } from 'react-icons/ai';
// const ipcRenderer = window.require("electron").ipcRenderer;

// function SettingsPopup({ onClose, currentScreenshotsPerMinute, setScreenshotsPerMinute }) {
//   const [newScreenshotsPerMinute, setNewScreenshotsPerMinute] = useState(
//     currentScreenshotsPerMinute
//   );

  

//   // Function to handle the user changing the screenshots per minute value
//   const handleScreenshotsPerMinuteChange = (event) => {
//     setNewScreenshotsPerMinute(parseInt(event.target.value, 10));
//   };

//   // Function to save the new screenshots per minute value and close the popup
//   const handleSaveSettings = () => {
//     setScreenshotsPerMinute(newScreenshotsPerMinute); // Call the setter function to update the value in App.js state
//     ipcRenderer.send('update-screenshots-per-minute', newScreenshotsPerMinute); // Send the updated value to the main process
//     onClose(newScreenshotsPerMinute);
//   };

//   // Function to close the popup without saving changes
//   const handleCancelSettings = () => {
//     onClose();
//   };

//   return (
//     <div>
//       <h2>Settings</h2>
//       <p>Screenshots per minute:</p>
//       <input
//         type="range"
//         min={1}
//         max={10}
//         value={newScreenshotsPerMinute}
//         onChange={handleScreenshotsPerMinuteChange}
//       />
//       <p>{newScreenshotsPerMinute}</p>
//       <button onClick={handleSaveSettings}>Save</button>
//       <button onClick={handleCancelSettings}>Cancel</button>
//     </div>
//   );
// }

// export default SettingsPopup;