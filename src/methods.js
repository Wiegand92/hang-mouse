import { generateDOM } from './DOM.js'
import { words } from './fake-db.js'

//Game class
class Hangman { 

  constructor(word, numGuesses){
    this.word = word.toLowerCase().split('')
    this.wordsArray = words.cats
    this.numGuesses = numGuesses
    this.remainingGuesses = numGuesses
    this.guessArray = []
    this.status = {
      string: 'playing',
      percent: 100
    }
    this.originalWord = word,
    this.playerWordsGuessed = []
  }

  //Reset the properties with the new word
  newPuzzle(word, numGuesses) {
    this.word = word.toLowerCase().split('')
    this.numGuesses = numGuesses
    this.remainingGuesses = numGuesses
    this.guessArray = []
    this.status = {
      string: 'playing',
      percent: 100
    }
    this.originalWord = word
  }

  //Display the puzzle
  getPuzzle() {
    let guessString = ''
    this.word.forEach(letter => {
      let hasBeenGuessed = this.guessArray.includes(letter)
      if(hasBeenGuessed){
        guessString += letter
      } else {
        letter === ' ' ? guessString += ' ' : guessString += '*'
      }
    })
    generateDOM(guessString, this.remainingGuesses, this.status, this.originalWord, this.guessArray)
  }

  //Make a guess
  makeGuess(guess) {
    guess = guess.toLowerCase()
    if(this.guessArray.includes(guess) || guess.length !== 1){
      return
    }
    if(!this.word.includes(guess)){
      this.remainingGuesses -= 1
    }
    this.guessArray.push(guess)
    this.getStatus()
  }
  
  //Display status
  getStatus() {
    this.status.percent = Math.floor((this.remainingGuesses / this.numGuesses) * 100)
    const checkFunc = letter => { 
      if(letter === ' ') {
        return true
      } else if(this.guessArray.includes(letter)){
        return true
      } else {
        return false
      }
    }
  
    let isDone = this.word.every(checkFunc)
  
    if(this.remainingGuesses > 0 && !isDone) {
      this.status.string = 'playing'
    }
    if(isDone){
      this.status.string = 'won'
    }
    if(this.remainingGuesses === 0) {
      this.status.string = 'failed'
    }
  }

  handleNewGame = () => {
    //Get a new word to play
    const anotherWord = getNewWord(this.wordsArray, this.playerWordsGuessed)
    //If the array is full, clear it and try again
    if(anotherWord === 'array full'){
      this.playerWordsGuessed = []
      this.handleNewGame()
      return
    //If there is a valid word, render the game
    } else if(anotherWord !== undefined) {
      const numGuesses = howManyGuesses(anotherWord)
      this.newPuzzle(anotherWord, numGuesses)
      this.getPuzzle()
      //Clear old listeners and add them again
      window.removeEventListener('keypress', this.handleKeyPress)
      window.addEventListener('keypress', this.handleKeyPress)
    } else {
      this.handleNewGame()
    }
    //Add the button listener again
    const newGameButton = document.querySelector('.new-game')
    newGameButton.addEventListener('click', this.handleNewGame)
  }

  handleKeyPress = (e) => {
    //If the player is not playing, remove listener
    if(this.status.string !== 'playing') {
      window.removeEventListener('keypress', this.handleKeyPress)
    }
    
    //Check what key was pressed and make a guess
    const guess = e.key.toLowerCase()
    if(isLetter(guess)){
      this.makeGuess(guess)
      this.getPuzzle()
    //Add Listeners to the new dom
      const newGameButton = document.querySelector('.new-game')
      newGameButton.addEventListener('click', this.handleNewGame)
    }
  }

  setWordsArray = (newArray) => {
    this.wordsArray = newArray
    this.handleNewGame()
  }
}


//checks to see if the player has played every word in the array
function matchArrays(playerArray, gameArray) {
  return gameArray.every(item => playerArray.includes(item))
}

//Checks how long the word is, and returns an appropriate amount of guesses
const howManyGuesses = word => {
  const wordLength = word.length
  if(wordLength <= 5){
    return 7
  }else if (wordLength <= 8){
    return  8
  }else if(wordLength <= 10){
    return 9
  }else {
    return 10
  }
}

//Gets a new word to guess
function getNewWord(wordsArray, wordsGuessed) {
  let newIndex = Math.floor(Math.random() * wordsArray.length)
  //If the word has not been played, play
  if (!wordsGuessed.includes(wordsArray[newIndex])){
    wordsGuessed.push(wordsArray[newIndex])
    return wordsArray[newIndex]
  //If all the words have been guessed
  } else if(matchArrays(wordsGuessed, wordsArray)) {
    return 'array full'
  //If the word has already been guessed
  } else {
    return undefined
  }
}

const isLetter = guess => {
  const letterString = 'abcdefghijklmnopqrstuvwxyz'
  const letterArray = letterString.split('')
  if(letterArray.includes(guess)){
    return true
  } else {
    return false
  }
}

export { Hangman, getNewWord, howManyGuesses }