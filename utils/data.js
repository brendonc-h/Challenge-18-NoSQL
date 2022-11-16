const userNames = [
    "Brendon",
    "Shawn",
    "Daniel",
    "Bill",
    "Clint",
    "Torrence",
    "Levi",
    "Terry",
    "Brian",
    "Patricia",
    "Chris",
    "Christian",
    "Steven",
    "Keith",
    "Jackie",
    "Jennifer",
    "Lorenzo",
    "Cletus",
    "Mack",
    "Terry",
  ];
  
  const appThoughts = [
    "This is thought one",
    "This is thought two",
    "This is thought three",
    "This is thought four",
    "This is thought five",
    "This is thought six",
    "This is thought seven",
    "This is thought eight",
    "This is thought nine",
    "This is thought ten",
    "This is thought eleven",
    "This is thought twelve",
    "This is thought thirteen",
    "This is thought fourteen",
    "This is thought fifteen",
    "This is thought sixteen",
    "This is thought seventeen",
    "This is thought eighteen",
    "This is thought nineteen",
    "This is thought twenty",
  ];
  
  // Get a random item given an array
  const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
  
  // Gets a random full name
  const getRandomUser = () =>
    `${getRandomArrItem(userNames)} ${getRandomArrItem(userNames)}`;
  
  const getRandomIndex = (arr) => Math.floor(Math.random() * arr.length);
  
  const getRandomThoughts = () => `${appThoughts[getRandomIndex(appThoughts)]}`;
  
  // Function to generate random assignments that we can add to student object.
  const generateThoughts = (int) => {
    let thought = "";
    for (let i = 0; i < int; i++) {
      thought += `${getRandomThoughts()}`;
    }
    return thought.trim();
  };
  
  // Export the functions for use in seed.js
module.exports = { getRandomUser, generateThoughts };