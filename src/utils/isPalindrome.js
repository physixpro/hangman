const isPalindrome = (str) => {
  const wordArr = str.split("").reverse().join("").toLowerCase();
  return str.toLowerCase() === wordArr;
};

export default isPalindrome;
