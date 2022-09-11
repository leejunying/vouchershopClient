import React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import moment from "moment";
import { Grid } from "@mui/material";

const useCountDown = (inputtime) => {
  const inputTime = new Date(inputtime);
  const eventTime = inputTime.getTime();
  const [duration, setDuration] = useState(eventTime - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(eventTime - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [eventTime]);

  const days = Math.floor(duration / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((duration % (1000 * 60)) / 1000);
  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

const ExpiredNotice = () => {
  return (
    <div className="expired-notice">
      <span>Expired!!!</span>
      <p>Sản phẩm đã hết hạn .</p>
    </div>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <Grid
      display="flex"
      item={true}
      style={{ width: "100%" }}
      className="countdown"
      justifyContent="space-evenly"
    >
      <span>{days}</span>
      <span>ngày</span>
      <span>{hours}</span>
      <span>giờ</span>
      <span>{minutes}</span>
      <span>phút</span>
      <span>{seconds}</span>
      <span>giây</span>
    </Grid>
  );
};

const CountdownTimer = ({ targetDate }) => {
  const countdown = useCountDown(targetDate);

  if (
    countdown.days + countdown.hours + countdown.minutes + countdown.seconds <=
    0
  ) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={countdown.days}
        hours={countdown.hours}
        minutes={countdown.minutes}
        seconds={countdown.seconds}
      />
    );
  }
};

export default CountdownTimer;
