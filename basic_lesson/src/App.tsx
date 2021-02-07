import React, { useState, useEffect } from "react";
import "./App.css";
import CleanUp from "./CleanUp";

const App: React.FC = () => {
  const [status, setStatus] = useState<string | number>("test");
  const [input, setInput] = useState("");
  const [counter, setCounter] = useState(0);
  const [display, setDisplay] = useState(true);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  useEffect(() => {
    console.log("useEffect");
    document.title = `${counter}`;
  }, [counter]);
  return (
    <div className="App">
      <header className="App-header">
        <h4>{status}</h4>
        <button
          onClick={() => {
            setStatus(1);
          }}
        >
          Button
        </button>
        <h4>{input}</h4>
        <input type="text" value={input} onChange={onChangeHandler} />
        <h4>{counter}</h4>
        <button onClick={() => setCounter(preCounter => preCounter + 1)}>
          Counter Button
        </button>
        {display && <CleanUp />}
        <button
          onClick={() => {
            setDisplay(!display);
          }}
        >
          Toggle Display
        </button>
      </header>
    </div>
  );
};

export default App;
