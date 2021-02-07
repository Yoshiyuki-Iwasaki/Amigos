import React, { useState, useEffect } from "react";
// import { incrementAsync } from "./features/counter/counterSlice";

const CleanUp: React.FC = () => {
  const [currentNum, setCurrentNum] = useState(0);
  const incrementNum = () => {
    console.log("incrementNum");
    setCurrentNum(preNumber => preNumber + 1);
  };
  useEffect(() => {
    console.log("CleanUp useEffect");
    window.addEventListener("mousedown", incrementNum);
  }, []);
  return <div>{currentNum}</div>;
};

export default CleanUp;
