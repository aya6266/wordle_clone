import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { useState, createContext } from "react";
import { boardDefault, generateWordSet } from "./Words";
import { useEffect } from "react";
import GameOver from "./components/GameOver";
import Modal from "./components/Modal";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [disableLetters, setDisabledLetters] = useState([]);
  const [correctWord, setCorrectWord] = useState("");
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });
  const [modal, setModal] = useState(false);

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
  }, []);

  const { attempt, letterPos } = currAttempt;
  const onSelectLetter = (keyVal) => {
    if (letterPos > 4) return;

    const newBoard = [...board];
    newBoard[attempt][letterPos] = keyVal;
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: letterPos + 1 });
  };

  const onDelete = () => {
    if (letterPos === 0) return;
    const newBoard = [...board];
    newBoard[attempt][letterPos - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: letterPos - 1 });
  };

  const onEnter = () => {
    if (gameOver.gameOver) {
      reset();
    }
    if (letterPos !== 5) return;
    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }
    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({ attempt: attempt + 1, letterPos: 0 });
    } else {
      //add the words shaking here
      setModal(true);
      return;
    }
    if (currWord.toLowerCase() === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }
    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
    }
  };

  const reset = () => {
    gameOver.gameOver = false;
    setBoard([
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ]);
    setCurrAttempt({ attempt: 0, letterPos: 0 });
    setDisabledLetters([]);
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
  };

  const handleModal = () => {
    setModal(false);
  };
  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          onDelete,
          onEnter,
          onSelectLetter,
          correctWord,
          setDisabledLetters,
          disableLetters,
          gameOver,
          setGameOver,
          handleModal,
        }}
      >
        <div className="game">
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
        {modal && <Modal />}
      </AppContext.Provider>
    </div>
  );
}

export default App;
