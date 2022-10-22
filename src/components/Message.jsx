import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
const { io } = require("socket.io-client");
const socket = io(`wss://messenger-my-testing.herokuapp.com`);

const Message = ({ nameUser }) => {
  const [socketNew, setSocketNew] = useState(socket);
  const chat = useRef();

  useEffect(() => {
    socket.connect();
    socket.emit("login", { name: nameUser });
    return () => {
      setSocketNew(socket);
      socket.disconnect({ name: nameUser });
    };
  }, []);

  socket.on("chat_message2", (data) => {
    if (data.status === "login") {
      if (itemMessage.find((num) => num.name === data.name) !== undefined) {
        return;
      }
      setItemMessage([...itemMessage, data]);
      return;
    }
    setItemMessage([...itemMessage, data]);
  });

  const [itemMessage, setItemMessage] = useState([]);

  const submitMessage = () => {
    axios("https://messenger-my-testing.herokuapp.com/test").then((res) => {
      console.log(res);
    });
    setSocketNew(socket);

    socket.emit("chatmessage", {
      status: "ok",
      name: nameUser,
      message: chat.current.value,
    });

    setItemMessage([
      ...itemMessage,
      {
        name: nameUser,
        message: chat.current.value,
      },
    ]);
    chat.current.value = "";
  };
  onkeydown = (e) => {
    if (e.code !== "Enter") return;
    submitMessage();
  };

  return (
    <div className="chat">
      <div className="chat-logo">
        <ul className="chat-logo-list">
          {itemMessage.map((num, index) =>
            num.status === "login" ? (
              <li key={index}>{num.message}</li>
            ) : (
              <li
                className={`chat-logo-item${
                  num.name === nameUser ? "-my" : ""
                }`}
                key={index}
              >
                <h1
                  className={`chat-logo-title${
                    num.name === nameUser ? "-my" : ""
                  }`}
                >
                  {num.name === nameUser ? "Вы" : num.name}
                </h1>
                <p
                  className={`chat-logo-text${
                    num.name === nameUser ? "-my" : ""
                  }`}
                >
                  {num.message}
                </p>
              </li>
            )
          )}
        </ul>
      </div>
      <input type="text" className="chat-message" ref={chat} />
      <button className="chat-submit" onClick={submitMessage}>
        Отправить сообщение
      </button>
    </div>
  );
};
export default Message;
