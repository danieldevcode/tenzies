import React from "react";

function Timer(props) {
  const [time, setTime] = React.useState({
    milliseconds: 0,
    seconds: 0,
    minutes: 0,
  });

  const bestTimeRef = React.useRef({ ...time });


  // NOTE: time state is not inmediately updated, it has to use effects
  // Timer control
  React.useEffect(() => {
    let timeoutId;
    if (props.isRunning) {
      timeoutId = setTimeout(() => {
        // Update milliseconds
        setTime((prevTime) => {
          return { ...prevTime, milliseconds: prevTime.milliseconds + 1 };
        });

        // Update seconds
        if (time.milliseconds == 99)
          setTime((prevTime) => {
            return {
              ...prevTime,
              milliseconds: 0,
              seconds: prevTime.seconds + 1,
            };
          });

        //Update minutes
        if (time.seconds == 60) {
          setTime((prevTime) => {
            return {
              ...prevTime,
              seconds: 0,
              minutes: prevTime.minutes + 1,
            };
          });
        }
      }, 10);
    }
  }, [props.isRunning, time]);

  // Update time stats
  React.useEffect(() => {
    if (props.isRunning == false) {
      const bestTimeDate = new Date();
      bestTimeDate.setMinutes(bestTimeRef.current.minutes);
      bestTimeDate.setSeconds(bestTimeRef.current.seconds);
      bestTimeDate.setMilliseconds(bestTimeRef.current.milliseconds);

      const localTimeDate = new Date();
      localTimeDate.setMinutes(time.minutes);
      localTimeDate.setSeconds(time.seconds);
      localTimeDate.setMilliseconds(time.milliseconds);

      const isFirstTime = Object.values(bestTimeRef.current).every(
        (unit) => unit === 0
      );

      if (isFirstTime || localTimeDate < bestTimeDate) {
        bestTimeRef.current = {
          minutes: time.minutes,
          seconds: time.seconds,
          milliseconds: time.milliseconds,
        };
      }
    }
  }, [props.isRunning]);

  // Reset local timer
  React.useEffect(() => {
    if (!props.tenzies) setTime({ milliseconds: 0, seconds: 0, minutes: 0 });
  }, [props.tenzies]);

  return (
    <>
      <p>
        Time: {time.minutes} : {time.seconds} : {time.milliseconds}
      </p>
      <p>
        🏆 Best time: {bestTimeRef.current.minutes} :{" "}
        {bestTimeRef.current.seconds} : {bestTimeRef.current.milliseconds}
      </p>
    </>
  );
}

export default Timer;
