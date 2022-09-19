import React, { useState, useEffect } from "react";
import Hangman from "./Hangman";
import isPalindrome from "./utils/isPalindrome";

const MainScreen = () => {
  const [words, setWords] = useState([]);

  const readFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.readAsText(e.target.files[0]);
    //this function loads only after parsing the whole file
    reader.onload = function () {
      // console.log("word ->", reader.result);
      // add if else functionality later to choose dynamic formatting*******************************
      const allWords = reader.result.split("\r\n");
      console.log(allWords);
      setWords(allWords);
      // const onlyPalindromesWords = reader.result
      //   .split("\r\n")
      //   .filter((word) => isPalindrome(word));
      // setWords(onlyPalindromesWords);
    };
  };

  const randomIndex = Math.floor(Math.random() * words.length);
  console.log(randomIndex);
  const palindromeWords = words.filter((word) => isPalindrome(word));
  console.log("P", palindromeWords);
  const word = words[randomIndex];

  return (
    <div>
      <h1>please select a file</h1>
      <input type="file" onChange={(e) => readFile(e)} />
      <ul>
        {words.map((word) =>
          isPalindrome(word) ? (
            <li style={{ color: "green" }}>{word}</li>
          ) : (
            <li style={{ color: "red" }}>{word}</li>
          )
        )}
      </ul>
      {word && <Hangman word={word.toUpperCase()} />}
    </div>
  );
};

export default MainScreen;
