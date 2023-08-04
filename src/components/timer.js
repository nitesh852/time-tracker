import React, { useState, useEffect } from 'react';
import clock from "../assets/clockify-logo.svg"
import { FaPlay, FaStop } from 'react-icons/fa';
const Timer = () => {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [resetTimer, setResetTimer] = useState(false); 
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  let timer;

  useEffect(() => {
    if (isTimerRunning) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);

        if (seconds === 59) {
          setMinutes((prevMinutes) => prevMinutes + 1);
          setSeconds(0);
        }
        if (minutes === 59) {
          setHours((prevHours) => prevHours + 1);
          setMinutes(0);
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isTimerRunning, seconds, minutes]);

  const handleTimerStart = () => {
    if (isTimerRunning) {
      setIsTimerRunning(false);
    } else {
      setIsTimerRunning(true); 
      if (!resetTimer) {
        setSeconds(0); 
        setMinutes(0); 
        setHours(0); 
      }
      setResetTimer(false);
    }
  };

  return (
    <div>
      <img src={clock} alt="" />
      <h1>{hours < 10 ? '0' + hours : hours}:{minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}</h1>
      <button onClick={handleTimerStart}>{isTimerRunning ? <FaStop className="bg-red-500" />: <FaPlay /> }</button>
    </div>
  );
};

export default Timer;
