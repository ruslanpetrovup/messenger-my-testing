import "./App.css";
import React, { useState, useRef } from "react";
import Message from "./Message";

const App = () => {
  const inputName = useRef();
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="App">
      <div className="container">
        {!isActive ? (
          <div className="content">
            <p>Как вас зовут?</p>
            <input className="input-name" ref={inputName} />
            <button
              className="button-go"
              onClick={() => {
                setIsActive(!isActive);
              }}
            >
              Start
            </button>
          </div>
        ) : (
          <Message nameUser={inputName.current.value} />
        )}
      </div>
    </div>
  );
};

export default App;
