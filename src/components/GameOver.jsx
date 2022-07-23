import React, { useContext, useCallback, useEffect } from "react";
import { AppContext } from "../App";

const GameOver = () => {
  const { gameOver, setGameOver, correctWord, currAttempt, onEnter } =
    useContext(AppContext);
  const pressedEnter = useCallback((e) => {
    if (e.key === "Enter") {
      onEnter();
    }
  });
  useEffect(() => {
    document.addEventListener("keydown", pressedEnter);
    return () => {
      document.removeEventListener("keydown", pressedEnter);
    };
  }, [pressedEnter]);
  return (
    <div className="gameOver">
      <h3>{gameOver.guessedWord ? "CONGRATS" : "MAYBE THE NEXT ONE"}</h3>
      <h1>Correct: {correctWord}</h1>
      {gameOver.guessedWord && (
        <h3> You guessed in {currAttempt.attempt} attempts</h3>
      )}
      <h1 onClick={onEnter}>Play Again</h1>
    </div>
  );
};

export default GameOver;
