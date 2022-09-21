import React, { useState, useEffect, useRef } from "react";
import imageOne from "./components/images/imageOne.jpg";
import imageTwo from "./components/images/imageTwo.jpg";
import imageThree from "./components/images/imageThree.jpg";
import imageFour from "./components/images/imageFour.jpg";
import imageFive from "./components/images/imageFive.jpg";
import imageSix from "./components/images/imageSix.jpg";
import imageSeven from "./components/images/imageSeven.jpg";

const GAME_DURATION = 20;

const Hangman = ({ word }) => {
  console.log("THE WORD ! -> ", word);
  const [result, setResult] = useState("");
  const [counter, setCounter] = useState(GAME_DURATION);
  const images = [
    imageOne,
    imageTwo,
    imageThree,
    imageFour,
    imageFive,
    imageSix,
    imageSeven,
  ];
  const [mistakes, setMistakes] = useState(0);

  let timeout = useRef(null);
  useEffect(() => {
    if (counter > 0) {
      timeout.current = setTimeout(() => setCounter(counter - 1), 1000);
    } else {
      if (counter === 0) {
        setResult("L");
      }
    }

    return () => clearTimeout(timeout);
  }, [counter]);

  /*********************************************** CHANGING CODE ************************************* */

  // console.log(word);
  const alphabets = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  /** by default, allow 6 guesses and use provided gallows images. */
  //  const  defaultProps = {
  //   maxWrong: 6,
  //   images: [imageOne, imageTwo, imageThree, imageFour, imageFive, imageSix, imageSeven]
  // };
  /*************************************  STATE FOR GUESSING CORRECT WORDS *******************************/

  const [correctLetter, setCorrectLetter] = useState([]);

  /***************** This is my hidden word with blank spaces, which fills in letters till the word becomes visible ******* */
  const hiddenWord = word
    .split("")
    .map((letter) => (correctLetter.includes(letter) ? letter : "_"))
    .join("");

  const stopTime = (t) => {
    return clearTimeout(t);
  };

  const wordArr = word.toUpperCase().split("");
  console.log(wordArr);
  let checker = (ar1, ar2) => ar1.every((r) => ar2.includes(r));

  useEffect(() => {
    const checkerRes = checker(wordArr, correctLetter);
    console.log(wordArr, correctLetter, checkerRes);
    if (checkerRes) {
      console.log("STOPPING THE TIME");
      clearTimeout(timeout.current);
    }
  }, [correctLetter]);

  const manhung = () => {
    if (images[mistakes] === imageSeven) {
      stopTime(timeout.current) && <p>You Lose!</p>;
      console.log(manhung, "************** here is when it fires*********");
    }
  };

  return (
    <div>
      <header>Hangman version.1.0.0.beta</header>
      <img src={images[mistakes]} />
      {console.log(images[mistakes], "my images here")}
      <div>Countdown: {counter}</div>
      <button id="pauseButton" onClick={() => stopTime(timeout.current)}>
        PAUSE
      </button>
      <p>{hiddenWord}</p>
      {alphabets.map((alphabet, index) => (
        <button
          class="keyboard"
          key={index}
          onClick={() => {
            if (word.includes(alphabet)) {
              setCorrectLetter([...correctLetter, alphabet]);
            } else {
              setMistakes((oldMistake) => oldMistake + 1);
            }
          }}
        >
          {alphabet}
        </button>
      ))}
      {images[mistakes] === imageSeven ? <p id="lose">You Lose!</p> : null}
      {result != "L" ? (
        !hiddenWord.includes("_") && <p id="win">YOU'VE WON</p>
      ) : (
        <p id="lose">thanks for playing!</p>
      )}
    </div>
  );
};

export default Hangman;
