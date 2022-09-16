import React, { useState } from "react";
import isPalindrome from "./utils/isPalindrome";

const Hangman = () => {
  ///the event has a files object on it sicne has been submitted
  const readFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.readAsText(e.target.files[0]);
    //this function loads only after parsing the whole file
    reader.onload = function () {
      console.log("word ->", reader.result);
      const arrWords = reader.result.split("\r\n")
      //update the array of the words state
      setWords((oldArray) => [...oldArray, reader.result.split("\r\n")]);
      for (const word of arrWords ) {
        console.log(word + "---->" + isPalindrome(word))
      }
    };
  };
  const [words, setWords] = useState([]);

  console.log("STAte", words);

  return (
    <div>
      <input type="file" onChange={(e) => readFile(e)} />
    </div>
  );
};

export default Hangman;
