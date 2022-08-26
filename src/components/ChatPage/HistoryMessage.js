import cls from "./Chat.module.scss";
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
  };
  const lastmsg = chunk[chunk.length - 1];
  return (
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
      </div>
      {lastmsg.text ? <p>{lastmsg.text}</p> : <p>file</p>}
    </div>
  );
};
export default HistoryMesages;
