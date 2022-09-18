import React, { useState, useEffect } from "react";
import isPalindrome from "./utils/isPalindrome";
import imageOne from "./components/images/imageOne.jpg";
import imageTwo from "./components/images/imageTwo.jpg";
import imageThree from "./components/images/imageThree.jpg";
import imageFour from "./components/images/imageFour.jpg";
import imageFive from "./components/images/imageFive.jpg";
import imageSix from "./components/images/imageSix.jpg";
import imageSeven from "./components/images/imageSeven.jpg";

const Hangman = ({ duration = 10000 }) => {

  const [gameOverTimer, setGameOverTimer] = useState(true); 
  useEffect(() => {
    const timeout = setTimeout(() => {
      if(setGameOverTimer(true) && !hiddenWord.includes("_") ){
        setGameOverTimer(false)
      };
    },duration);

    return () => clearTimeout(timeout);
  
  }, [duration]);

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
    console.log(word)

 
const over = () => {
  setGameOverTimer(false) 
  console.log(over)
}

  
  

  return (
    <div>
      <input type="file" onChange={(e) => readFile(e)} />

      <header>Test Word: Hangman</header>
      <p>OUR HANGMAN IMAGE GOES HERE</p>

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
      {gameOverTimer? (
        !hiddenWord.includes("_") && <p>youve won</p>): (<p>youve lost</p>)
      }
      {/* {gameOverTimer ? (
        <p>Sorry, you lost!</p>
      ) : ( 
         !hiddenWord.includes("_") && <p>You've Won</p>
      )} */}
    </div>
  );
};

export default Hangman;
