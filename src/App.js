import './App.css';
import React, { useState } from 'react';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(1500);
  const [type, setType] = useState('SESSION');
  const [start, setStart] = useState(false);

  const handleBreakAdd = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };
  const handleBreakMinus = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };
  const handleSessionAdd = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimeLeft(timeLeft + 60);
    }
  };
  const handleSessionMinus = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimeLeft(timeLeft - 60);
    }
  };

  const timeout = () => {
    setTimeout(() => {
      if (timeLeft && start) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);
  };

  const title = type === 'SESSION' ? 'Session' : 'Break';
  const timerFormat = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const handleStart = () => {
    clearInterval(timeout);
    setStart(!start);
  };

  const handleReset = () => {
    clearTimeout(timeout);
    setStart(false);
    setTimeLeft(1500);
    setBreakLength(5);
    setSessionLength(25);
    setType('SESSION');
    const audio = document.getElementById('beep');
    audio.pause();
    audio.currentTime = 0;
  };

  const resetTimer = () => {
    const audio = document.getElementById('beep');
    if (!timeLeft && type === 'SESSION') {
      setTimeLeft(breakLength * 60);
      setType('BREAK');
      audio.play();
    }
    if (!timeLeft && type === 'BREAK') {
      setTimeLeft(sessionLength * 60);
      setType('SESSION');
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const clock = () => {
    if (start) {
      timeout();
      resetTimer();
    } else {
      clearTimeout(timeout);
    }
  };

  React.useEffect(() => {
    clock();
  }, [start, timeLeft, timeout]);

  return (
    <div className='App'>
      <div className='wrapper'>
        <h1>Pomodoro Clock</h1>

        <div className='break-session-length'>
          <div className='break-wrapper'>
            <h3 id='break-label'>Break Length</h3>
            <div className='break-control'>
              <button id='break-decrement' onClick={() => handleBreakMinus()}>
                -
              </button>
              <strong id='break-length'>{breakLength}</strong>

              <button id='break-increment' onClick={() => handleBreakAdd()}>
                +
              </button>
            </div>
          </div>

          <div className='session-wrapper'>
            <h3 id='session-label'>Session Length</h3>
            <div className='session-control'>
              <button
                id='session-decrement'
                onClick={() => handleSessionMinus()}
              >
                -
              </button>
              <strong id='session-length'>{sessionLength}</strong>
              <button id='session-increment' onClick={() => handleSessionAdd()}>
                +
              </button>
            </div>
          </div>
        </div>

        <div className='timer-wrapper'>
          <h2>In {title}</h2>
          <strong>
            <h2>{timerFormat()}</h2>
          </strong>
          <div className='timer-controller'>
            <button
              className='timer-btn'
              style={{
                fontWeight: 'bold',
                color: 'navy',
                backgroundColor: 'tomato',
              }}
              onClick={() => handleStart()}
            >
              Start/Pause
            </button>
            <button className='timer-btn' onClick={() => handleReset()}>
              Reset
            </button>
          </div>
        </div>
      </div>

      <audio
        id='beep'
        preload='auto'
        src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'
      />
    </div>
  );
}

export default App;
