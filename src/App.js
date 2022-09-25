import "./App.css";
import React, { useEffect, useState } from "react";
import Message from "./Message";
const { io } = require("socket.io-client");
const socket = io(`ws://messenger-my-testing.herokuapp.com`);

const App = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="App">
      <div className="container">
        {!isActive ? (
          <div className="content">
            <p>Как вас зовут?</p>
            <input className="input-name" />
            <button
              className="button-go"
              onClick={() => {
                const el = document.querySelector(".input-name").value;
                // setName(el);
                setIsActive(!isActive);
                // addUser(el);
              }}
            >
              Start
            </button>
          </div>
        ) : (
          <Message
            nameUser={document.querySelector(".input-name").value}
            socket={socket}
          />
        )}
      </div>
    </div>
  );
};

export default App;
