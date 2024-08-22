import { useEffect, useState } from "react";

export default function QuestionTimer({ timer, onTimeUp }) {
  const [remaningTime, setRemainingTime] = useState(timer);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      onTimeUp();
    }, timer);

    return () => {
      clearTimeout(timeOut);
    };
  }, [timer, onTimeUp]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prev) => prev - 100);
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return <progress id="question-time" value={remaningTime} max={timer} />;
}
