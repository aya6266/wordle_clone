import wordleBank from "./wordleBank.txt";

export const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

export const generateWordSet = async () => {
  //uses a set instead of an array as its more effienct than looping over >2000 words
  //Look up time is O(1)
  let wordSet;
  let todaysWord;
  await fetch(wordleBank)
    .then((response) => response.text())
    .then((result) => {
      const wordArr = result.split("\r\n");
      todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)];
      wordSet = new Set(wordArr);
    });

  return { wordSet, todaysWord };
};
