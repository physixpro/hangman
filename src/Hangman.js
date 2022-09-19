import React, { useState, useEffect, useRef } from "react";
import isPalindrome from "./utils/isPalindrome";
import imageOne from "./components/images/imageOne.jpg";
import imageTwo from "./components/images/imageTwo.jpg";
import imageThree from "./components/images/imageThree.jpg";
import imageFour from "./components/images/imageFour.jpg";
import imageFive from "./components/images/imageFive.jpg";
import imageSix from "./components/images/imageSix.jpg";
import imageSeven from "./components/images/imageSeven.jpg";
import { clear } from "@testing-library/user-event/dist/clear";

const Hangman = ({ duration = 10000 }) => {
  const [result, setResult] = useState("");
  const [counter, setCounter] = useState(10);

  let timeout = useRef(null)
  useEffect(() => {
    if (counter > 0) {
      timeout.current = setTimeout(() => setCounter(counter - 1), 1000);
    } else {
      if (counter === 0) {
        setResult("L");
      }
    }
  }, [counter]);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setGameOverTimer(true)
  //     // if (setGameOverTimer(true) && !hiddenWord.includes("_")) {
  //     //   setGameOverTimer(false);
  //     // }
  //   });

  //   return () => clearTimeout(timeout);
  // }, [duration]);

  ///the event has a files object on it sicne has been submitted
  const readFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.readAsText(e.target.files[0]);
    //this function loads only after parsing the whole file
    reader.onload = function () {
      // console.log("word ->", reader.result);
      // add if else functionality later to choose dynamic formatting*******************************
      const onlyPalindromesWords = reader.result
        .split("\r\n")
        .filter((word) => isPalindrome(word));
      setWords(onlyPalindromesWords);
    };
  };
  const [words, setWords] = useState([]);

  // console.log("State", words);
  /*********************************************** CHANGING CODE ************************************* */

  "HANGMAN".split("").fill("").join("");

  const word = "Hangman".toUpperCase();
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
  // console.log(alphabets);

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

  const wordArr = "HANGMAN".split("")
  console.log(wordArr)
  let checker= (ar1,ar2) => ar1.every(r => ar2.includes(r))


  useEffect(() => {
    const checkerRes = checker(wordArr,correctLetter)
    console.log(wordArr,correctLetter, checkerRes)
    if(checkerRes){console.log("STOPPING THE TIME"); clearTimeout(timeout.current)}
    
  }, [correctLetter]);

  return (
    <div>
      <input type="file" onChange={(e) => readFile(e)} />

      <header>Test Word: Hangman</header>
      <p>OUR HANGMAN IMAGE GOES HERE</p>

      <div>Countdown: {counter}</div>
      <button onClick={() => stopTime(timeout.current)}>stop timer</button>
      <p>{hiddenWord}</p>
      {alphabets.map((alphabet, index) => (
        <button
          key={index}
          onClick={() => {
            if (word.includes(alphabet)) {
              setCorrectLetter([...correctLetter, alphabet]);
            }
          }}
        >
          {alphabet}
        </button>
      ))}

      {result != "L" ? (
        !hiddenWord.includes("_") && <p>youve won</p>
      ) : (
        <p>youve lost</p>
      )}
    </div>
  );
};

export default Hangman;
