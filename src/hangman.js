import { Hangman, getNewWord, howManyGuesses } from './methods.js'
import { words } from './fake-db.js'

const newWord = getNewWord(words.cats, [])
const numGuesses = howManyGuesses(newWord)

const game = new Hangman(newWord, numGuesses)

const category = document.querySelector('#category')

category.addEventListener('change', (e) => {
  let newArray = []
  switch (e.target.value){
    case 'cats':
      newArray = words.cats
      break;
    case 'dogs':
      newArray = words.dogs
      break;
    case 'food':
      newArray = words.food
      break;
  }
  game.setWordsArray(newArray)
})

game.getPuzzle()

const newGameButton = document.querySelector('.new-game')
newGameButton.addEventListener('click', game.handleNewGame)

window.addEventListener('keypress', game.handleKeyPress)