import React, { useState, useEffect } from "react";
import Hangman from "./Hangman";
import isPalindrome from "./utils/isPalindrome";
import { useSelector, useDispatch } from "react-redux";
import { add } from "./features/words/wordSlice";

const MainScreen = () => {
  //const [words, setWords] = useState([]);
  const words = useSelector((store) => store.words.data);
  console.log("STORE WORDS", words);
  const dispatch = useDispatch();

  const readFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.readAsText(e.target.files[0]);
    //this function loads only after parsing the whole file
    reader.onload = function () {
      // console.log("word ->", reader.result);
      // add if else functionality later to choose dynamic formatting*******************************
      const allWords = reader.result.split("\r\n");

      dispatch(add(allWords));
    };
  };

  const randomIndex = words && Math.floor(Math.random() * words.length);
  const palindromeWords = words && words.filter((word) => isPalindrome(word));
  const word = palindromeWords[randomIndex];

  return (
    <div>
      <h1>Please Select a File!</h1>
      <input type="file" onChange={(e) => readFile(e)} />
      <ul className="tilesWrap">
        {words.map((word, i) =>
          isPalindrome(word) ? (
            <li key={i} style={{ color: "green" }}>
              {word}
            </li>
          ) : (
            <li key={i} style={{ color: "red" }}>
              {word}
            </li>
          )
        )}
      </ul>
      {word && <Hangman word={word.toUpperCase()} />}
    </div>
  );
};

export default MainScreen;
