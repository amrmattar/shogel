import { useEffect, useState } from "react";

const TimeDisplayer = ({ time }) => {
  const [fakeCurrentDate, setFakeCurrentDate] = useState(new Date());

  useEffect(() => {
    setTimeout(() => setFakeCurrentDate(new Date()), 10000);
  }, [fakeCurrentDate]);
  const getMsgTime = (time) => {
    let msgDate = new Date(time);
    let seconds = (new Date() - msgDate) / 1000;
    let minutes = seconds / 60;
    let hours = minutes / 60;
    if (minutes < 1) {
      return "الان";
    } else if (minutes < 60) {
      return `${Math.round(minutes)} دقيقة`;
    } else if (hours < 24) {
      return `${Math.round(hours)} ساعة`;
    } else {
      return `${msgDate.getFullYear()}-${
        msgDate.getMonth() + 1
      }-${msgDate.getDate()}`;
    }
  };
  return <p>{getMsgTime(time)}</p>;
};
export default TimeDisplayer;
