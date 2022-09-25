import React, { useState, useEffect } from "react";

const Message = ({ nameUser, socket }) => {
  useEffect(() => {
    console.log(socket.id);
  }, [socket]);

  socket.on("chat message", (data) => {
    // console.log(data);
    if (Object.keys.length !== 0 && data.name !== nameUser) {
      setItemMessage([...itemMessage, data]);
    }
  });

  const [itemMessage, setItemMessage] = useState([]);

  const [idSocket, setIdSocket] = useState();

  const submitMessage = () => {
    const text = document.querySelector(".chat-message").value;

    socket.emit(
      "chat message",
      JSON.stringify({
        name: nameUser,
        message: text,
      })
    );
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
          {itemMessage.map((num, index) => (
            <li
              className={`chat-logo-item${num.name === nameUser ? "-my" : ""}`}
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
          ))}
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
