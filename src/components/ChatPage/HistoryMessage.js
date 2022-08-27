import { useEffect, useState } from "react";
import cls from "./Chat.module.scss";
import TimeDisplayer from "./TimeDisplayer";
const HistoryMesages = ({ changeSide, search, chunk, user }) => {
  // const messageClass = senderId === props?.user?.id ? "sent" : "received";
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  const myFirstMsg = chunk.find((ele) => ele.senderId == user.id);
  const hisFirstMsg = chunk.find((ele) => ele.senderId != user.id);
  const sideData = {
    id: myFirstMsg?.recevierId || hisFirstMsg?.senderId,
    avatar: hisFirstMsg?.senderAvatar || myFirstMsg?.recevierAvatar,
    name: hisFirstMsg?.senderName || myFirstMsg?.recevierName,
    role: hisFirstMsg?.senderRole || myFirstMsg?.recevierRole,
  };
  const lastmsg = chunk[chunk.length - 1];
  return sideData.name.includes(search) ? (
    <div onClick={() => changeSide(sideData)} className={cls.historymessage}>
      <div className={cls.historyComp}>
        <img
          alt="userImg"
          src={sideData.avatar}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
          }}
        />
        <p>{sideData.name}</p>
        <p>{sideData.role}</p>
      </div>
      {lastmsg.text ? <p>{lastmsg.text}</p> : <p>file</p>}
      <TimeDisplayer time={lastmsg.createdAt} />
    </div>
  ) : null;
};
export default HistoryMesages;
