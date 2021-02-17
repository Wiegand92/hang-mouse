const generateDOM = (guessString, guessesLeft, status, originalWord, guessArray) => {

  //Select game div from index.html (stores the whole game)
  const gameContainer = document.querySelector('#game')
  //Clear the container to avoid repeats
  gameContainer.innerHTML = ''

  //Will hold an image according to %done
  const imageContainer = document.createElement('img')
  imageContainer.className = 'image'
  generateImage(status, imageContainer)

  //Shows the word
  const word = document.createElement('div')
  word.className = 'word-container'
  generateWord(guessString, word)

  //Displays the status of the game
  const statusText = document.createElement('p')
  statusText.classList.add('status-text')
  generateStatus(status, guessesLeft, originalWord, statusText)

  //Create array of guessed letters
  const guesses = document.createElement('div')
  guesses.className = 'guesses'
  generateGuesses(guessArray, guesses)
  
  //Add a new Game Button
  const newGame = document.createElement('button')
  newGame.className = 'new-game'
  newGame.innerText = 'New Game!'

  //Place the info in the DOM
  gameContainer.append(imageContainer, word, statusText, guesses, newGame)
}

const generateWord = (guessString, el) => {
  const stringArray = guessString.split('')
  let wordBox = document.createElement('div')
  wordBox.classList.add('word-box')
  stringArray.forEach(letter => {
    const letterBox = document.createElement('p')
    if(letter !== ' ') {
      letterBox.className = 'puzzle-letter'
      letterBox.innerText = letter
      wordBox.appendChild(letterBox)
    } else if(letter === ' ') {
      el.appendChild(wordBox)
      const puzzleSpace = document.createElement('div')
      puzzleSpace.className = 'puzzle-space'
      el.appendChild(puzzleSpace)
      wordBox = document.createElement('div')
      wordBox.classList.add('word-box')
    } else {
      return
    }  
  })
  el.appendChild(wordBox)
}

const generateGuesses = (guesses, el) => {
  const wordBox = document.createElement('div')
  wordBox.classList.add('word-box', 'guesses-box')
  guesses.forEach(letter => {
    const letterBox = document.createElement('p')
    if(letter !== ' ') {
      letterBox.className = 'puzzle-letter'
    } else {
      letterBox.className = 'puzzle-space'
    }
    letterBox.innerHTML = letter
    wordBox.appendChild(letterBox)
  })
  el.appendChild(wordBox)
}

const generateStatus = (status, guessesLeft, originalWord, el) => {
  switch (status.string) {
    case 'playing':
      el.innerText = `You have ${guessesLeft} guesses left`
      break;
    case 'won':
      el.innerText = `Congrats you won!` 
      break;
    case 'failed':
      el.innerText = `Sorry you lost. The correct word was ${originalWord}`
  }
}

const generateImage = (status, el) => {
  if(status.percent === 100) {
    el.src = './images/100.png'
  } else if (status.percent >= 90) {
    el.src = './images/90.png'
  } else if (status.percent >= 80) {
    el.src = './images/80.png'
  } else if (status.percent >= 70) {
    el.src = './images/70.png'
  } else if (status.percent >= 60) {
    el.src = './images/60.png'
  } else if (status.percent >= 50) {
    el.src = './images/50.png'
  } else if (status.percent >= 40) {
    el.src = './images/40.png'
  } else if (status.percent >= 30) {
    el.src = './images/30.png'
  } else if (status.percent >= 20) {
    el.src = './images/20.png'
  } else if (status.percent >= 10) {
    el.src = './images/10.png'
  } else {
    el.src = './images/0.png'
  }
}

export { generateDOM }