import React, { useEffect, useCallback, useContext } from "react";
import Key from "./Key";
import { FiDelete } from "react-icons/fi";
import { AppContext } from "../App";

const Keyboard = () => {
  const { onDelete, onEnter, onSelectLetter, disableLetters } =
    useContext(AppContext);

  //Create Arrays as they allow for mapping of components
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  const handleKeyboard = useCallback((e) => {
    if (e.key === "Enter") {
      onEnter();
    } else if (e.key === "Backspace") {
      onDelete();
    } else {
      keys1.forEach((key) => {
        if (e.key.toUpperCase() === key) {
          onSelectLetter(key);
        }
      });
      keys2.forEach((key) => {
        if (e.key.toUpperCase() === key) {
          onSelectLetter(key);
        }
      });
      keys3.forEach((key) => {
        if (e.key.toUpperCase() === key) {
          onSelectLetter(key);
        }
      });
    }
  });
  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);
    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);
  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
      <div className="line1">
        {keys1.map((key) => {
          return <Key keyVal={key} disabled={disableLetters.includes(key)} />;
        })}
      </div>
      <div className="line2">
        {keys2.map((key) => {
          return <Key keyVal={key} disabled={disableLetters.includes(key)} />;
        })}
      </div>
      <div className="line3">
        <Key keyVal={"ENTER"} bigKey />
        {keys3.map((key) => {
          return <Key keyVal={key} disabled={disableLetters.includes(key)} />;
        })}
        <Key keyVal={<FiDelete />} bigKey />
      </div>
    </div>
  );
};

export default Keyboard;
