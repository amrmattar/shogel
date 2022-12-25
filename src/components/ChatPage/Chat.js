import React, { useEffect, useRef, useState } from "react";
import firebase from "firebase/compat/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/analytics";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import cls from "./Chat.module.scss";
import { useSelector } from "react-redux";
// import { storage } from "firebase";
import { v4 } from "uuid";
import { BsCloudUpload } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import HistoryMesages from "./HistoryMessage";
import { AiOutlineSearch } from "react-icons/ai";
import TimeDisplayer from "./TimeDisplayer";

import { FaUserCircle } from "react-icons/fa";
import { AiOutlineRight } from "react-icons/ai";

firebase.initializeApp({
  apiKey: "AIzaSyAMj1LZ0s4PfZlXcq-DdRWSyxdYHrX9Emg",
  authDomain: "sho8l-96261.firebaseapp.com",
  databaseURL: "https://sho8l-96261-default-rtdb.firebaseio.com",
  projectId: "sho8l-96261",
  storageBucket: "sho8l-96261.appspot.com",
  messagingSenderId: "879215757540",
  appId: "1:879215757540:web:8d79b23a2afd3b87e244f1",
  measurementId: "G-V5294RZD1R",
});

const auth = firebase.auth();
const analytics = firebase.analytics();
const firestore = firebase.firestore();
const demoIcon =
  "data:image/png;base64,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";

const Chat = () => {
  const [isCurrentChatOpen, setIsCurrentChatOpen] = useState(false);

  const param = useLocation();
  const otherSideId = param.state?.id;
  const otherSidAvatar = param.state?.avatar;
  const otherSidName = param.state?.name;
  const otherSidٌRole = param.state?.role;
  const [otherSideData, setOtherSideData] = useState({
    name: otherSidName,
    avatar: otherSidAvatar,
    id: otherSideId,
    role: otherSidٌRole,
  });

  const changeSide = (data) => {
    setOtherSideData(data);
    setIsCurrentChatOpen(true);
  };

  const [isLoading, setIsLoading] = useState(false);

  const [sortedMesage, setSortedMessages] = useState([]);
  const [historyMesage, setHistoryMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [file, setFile] = useState({});

  const storage = getStorage();
  const storageRef = ref(storage, `images/${Date.now()}`);
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt");

  const [user] = useSelector((state) => [state.userFullData]);
  const [messages] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const sendTextMsg = async (text) => {
      const msg = {
        text,
        senderId: user.id,
        senderRole: user.role?.name,
        senderAvatar: user.avatar || demoIcon,
        senderName: user?.fullname,
        recevierId: otherSideData.id,
        recevierName: otherSideData.name,
        recevierRole: otherSideData.role,
        recevierAvatar: otherSideData.avatar || demoIcon,
        createdAt: new Date().toISOString(),
      };

      setFormValue("");
      setFile({});

      await messagesRef.add(msg);
    };

    if (file?.type) {
      uploadBytes(storageRef, file)
        .then((snapshot) => {
          getDownloadURL(storageRef).then(async (url) => {
            const msg = {
              file: url,
              type: file.type,
              senderId: user.id,
              senderRole: user.role?.name,
              senderName: user?.fullname,
              senderAvatar: user.avatar || demoIcon,
              recevierId: otherSideData.id,
              recevierName: otherSideData.name,
              recevierRole: otherSideData.role,
              recevierAvatar: otherSideData.avatar || demoIcon,
              createdAt: new Date().toISOString(),
            };

            messagesRef.add(msg).then(async () => {
              if (formValue) await sendTextMsg(formValue);

              setIsLoading(false);
              setFormValue("");
              setFile({});
            });
          });
        })
        .catch((e) => {
          setIsLoading(false);
          console.log(e);
        });
    } else {
      try {
        setIsLoading(false);
        sendTextMsg(formValue);
      } catch (err) {
        setIsLoading(false);
      }
    }
  };

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  useEffect(() => {
    if (messages?.[0]) {
      let arr = messages.filter(
        (ele) =>
          (ele.senderId == user.id && ele.recevierId == otherSideData.id) ||
          (ele.senderId == otherSideData.id && ele.recevierId == user.id)
      );
      let arr3 = [...messages];
      let arr2 = arr3.filter(
        (ele) => ele.senderId == user.id || ele.recevierId == user.id
      );
      let sortingarr = [];
      let Mainsortingarr = [];

      for (let i = 0; i < arr2.length; i++) {
        const ele = arr2[i];
        let indx = sortingarr.findIndex(
          (el) =>
            (ele.senderId == el.senderId && ele.recevierId == el.recevierId) ||
            (ele.senderId == el.recevierId && ele.recevierId == el.senderId)
        );
        if (!sortingarr[0] || indx >= 0) {
          sortingarr.push(ele);
          arr2.splice(i, 1);
          i--;
        }
        if (i == arr2.length - 1) {
          Mainsortingarr.push(sortingarr);
          sortingarr = [];
          i = -1;
        }
      }

      setSortedMessages(arr);

      Mainsortingarr.sort((a, b) => {
        return new Date(b?.at(-1)?.createdAt) - new Date(a?.at(-1)?.createdAt);
      });

      setHistoryMessages(Mainsortingarr);
    }
  }, [messages, user, otherSideData]);

  return (
    <div className={cls.chatApp + " d-block d-md-grid mx-3 m-md-3 "}>
      <div
        className={`${cls.grid1} ${cls.chats} p-0 p-md-3 ${
          isCurrentChatOpen ? "d-none d-md-block" : ""
        }`}
      >
        <div className={cls.grid1Header}>
          <div style={{ justifyContent: "space-between", display: "flex" }}>
            <h3>جميع الرسائل</h3>

            {/* <p className={cls.numHolder}>{historyMesage.length || 0}</p> */}
          </div>
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث هنا"
            type={"text"}
          />
          <AiOutlineSearch />
        </div>

        <div style={{ overflow: "hidden" }} className={cls.historyHolder}>
          {historyMesage.map((ele, idx) => (
            <HistoryMesages
              key={idx}
              search={searchQuery}
              changeSide={changeSide}
              user={user}
              chunk={ele}
            />
          ))}
        </div>
      </div>

      <div
        className={`${cls.grid2} ${cls["current-chat"]} ${
          isCurrentChatOpen ? cls["active"] : ""
        }`}
      >
        <p
          className="bg-white py-3 mb-0 d-md-none"
          onClick={() => setIsCurrentChatOpen(false)}
        >
          <AiOutlineRight className="text-muted ms-2" size={26} />
          جميع الرسائل
        </p>
        <ChatRoom
          user={user}
          messages={sortedMesage}
          fileUpload={onFileChange}
          submit={sendMessage}
          setFormValue={setFormValue}
          disabled={!formValue && !file?.type}
          loading={isLoading}
          inpValue={formValue}
          fileValue={file}
          otherSideData={otherSideData}
        />
      </div>
    </div>
  );
};

const ChatRoom = ({
  user,
  disabled,
  submit,
  setFormValue,
  messages,
  fileUpload,
  inpValue,
  fileValue,
  otherSideData,
  loading,
}) => {
  const navigate = useNavigate();
  const dummy = useRef();
  const inpRef = useRef();
  const fileHandler = () => {
    inpRef.current.click();
  };

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={cls.activeChat}>
      <div className={cls.chatHeader}>
        <div className={cls.avatarHolder}>
          <img
            alt="chatImg"
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "10px",
            }}
            src={otherSideData?.avatar || demoIcon}
          />
          {/* <p>{otherSideData?.name}</p>
          <p>{otherSideData?.role}</p> */}
          <div>
            <div className={cls.chatUser}>{otherSideData?.name}</div>
            <div className={cls.chatJop}>{otherSideData?.role}</div>
          </div>
        </div>
        <button
          className="d-none d-md-block"
          hidden={!otherSideData?.id}
          onClick={() =>
            otherSideData?.id &&
            navigate(`/employed/freelancer-profile/${otherSideData?.id}`)
          }
        >
          تصفح الملف الشخصي
        </button>

        <button
          className="d-md-none"
          hidden={!otherSideData?.id}
          onClick={() =>
            otherSideData?.id &&
            navigate(`/employed/freelancer-profile/${otherSideData?.id}`)
          }
        >
          <FaUserCircle size={22} />
        </button>
      </div>
      <div className={cls.messageHolder}>
        {messages &&
          messages.map((msg, idx) => (
            <ChatMessage user={user} key={idx} message={msg} />
          ))}
        <span ref={dummy} />
      </div>

      <form className={cls.form} onSubmit={submit}>
        <input
          value={inpValue}
          className={cls.txtInput}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder=" إرسال رسالة ...."
          disabled={loading}
        />
        <div className={cls.fileHolder}>
          <input
            className={cls.inpFile}
            ref={inpRef}
            type="file"
            onChange={fileUpload}
            disabled={loading}
          />
          <BsCloudUpload onClick={fileHandler} className={cls.formUploader} />
          <p>{fileValue?.name}</p>
        </div>

        <button
          className={cls.btn}
          type="submit"
          disabled={disabled || !otherSideData?.id || loading}
        >
          <FiSend />
        </button>
      </form>
    </div>
  );
};

const ChatMessage = (props) => {
  const param = useLocation();
  const otherSideId = param.state?.id;
  const otherSidAvatar = param.state?.avatar;
  const [user] = useSelector((state) => [state.userFullData]);

  const { text, senderId, file, type, createdAt } = props.message;
  const isImage = type?.includes("image");
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <div
        className={`${cls.message} ${
          senderId === props?.user?.id ? cls.sent : ""
        }`}
      >
        <img
          alt="userImg"
          src={senderId === otherSideId ? otherSidAvatar : user.avatar}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "8px",
          }}
        />
        {text ? (
          <div className={cls.chatFrame}>
            <p className={cls.chatActual + " allowed-wrap"}>{text}</p>
            <TimeDisplayer time={createdAt} />
          </div>
        ) : isImage ? (
          <img
            alt="sentImg"
            src={file}
            style={{
              width: "200px",
              height: "200px",
              borderRadius: 5,
            }}
          />
        ) : (
          <img
            alt="sentImg"
            onClick={() => openInNewTab(file)}
            src={
              "https://icons-for-free.com/iconfiles/png/512/file+icon-1320087274221188067.png"
            }
            style={{
              width: "200px",
              height: "200px",
              borderRadius: 0,
              cursor: "pointer",
            }}
          />
        )}
      </div>
    </>
  );
};

export default Chat;
