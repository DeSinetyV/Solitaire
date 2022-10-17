import { useState, useEffect } from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';


// custom hook for setting the duration of the game to the right format
export function useTimer() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  let duration = moment.duration(seconds, 'seconds');
  return { setSeconds, duration: duration.format('HH:mm:ss') };
}
