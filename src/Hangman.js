import React, { useState } from "react";
import isPalindrome from "./utils/isPalindrome";
import imageOne from "./components/images/imageOne.jpg"
import imageTwo from "./components/images/imageTwo.jpg"
import imageThree from "./components/images/imageThree.jpg"
import imageFour from "./components/images/imageFour.jpg"
import imageFive from "./components/images/imageFive.jpg"
import imageSix from "./components/images/imageSix.jpg"
import imageSeven from "./components/images/imageSeven.jpg"

const Hangman = () => {
  ///the event has a files object on it sicne has been submitted
  const readFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.readAsText(e.target.files[0]);
    //this function loads only after parsing the whole file
    reader.onload = function () {
      console.log("word ->", reader.result);
      // add if else functionality later to choose dynamic formatting*******************************
      const onlyPalindromesWords = reader.result.split("\r\n").filter(word => isPalindrome(word))
      setWords(onlyPalindromesWords)
    };
  };
  const [words, setWords] = useState([]);

  console.log("STAte", words);

  return (
    <div>
      <input type="file" onChange={(e) => readFile(e)} />

    <header>Hangman</header>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti, sit.</p>
    </div>
  );
};

export default Hangman;
