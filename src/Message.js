import React, { useState, useEffect } from "react";
const { io } = require("socket.io-client");
const socket = io(`wss://messenger-my-testing.herokuapp.com`);

const Message = ({ nameUser }) => {
  // const [idUser, setIdUser] = useState(socket.id);
  const [socketNew, setSocketNew] = useState(socket);

  useEffect(() => {
    console.log("oooooooo");
    socket.connect();
    socket.emit("login", { name: nameUser });
    return () => {
      socket.disconnect();
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
    const text = document.querySelector(".chat-message").value;
    setSocketNew(socket);

    socket.emit("chatmessage", {
      status: "ok",
      name: nameUser,
      message: text,
    });

    setItemMessage([
      ...itemMessage,
      {
        name: nameUser,
        message: document.querySelector(".chat-message").value,
      },
    ]);
    document.querySelector(".chat-message").value = "";
  };
  return (
    <div className="chat">
      <div className="chat-logo">
        <ul className="chat-logo-list">
          {itemMessage.map((num, index) =>
            num.status === "login" ? (
              <li>{num.message}</li>
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
      <textarea className="chat-message"></textarea>
      <button className="chat-submit" onClick={submitMessage}>
        Отправить сообщение
      </button>
    </div>
  );
};
export default Message;
