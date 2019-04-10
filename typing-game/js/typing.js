console.log('Reading typing.js');
var currentRandomWord;
var currentRandomWordLength;
var currentInput = '';
var currentCharIndex = 0;

function updateCurrentInput (event) {
  console.log('Executing updateCurrentInput');
  let currentInputChar = event.key;
  checkLetter(currentInputChar);
  if (currentInputChar === 'Backspace') {
    currentInput = currentInput.slice(0, currentInput.length - 1);
    currentCharIndex--;
  } else {
    currentInput += currentInputChar;
    currentCharIndex++;
  }
  console.log(currentInput);
  checkWord();
}

function checkLetter (char) {
  console.log('Executing checkLetter()');
  char === currentRandomWord[currentCharIndex] ? changeTileCorrect() : changeTileWrong();
}

// Changes the tile of the respective letter to a styling that indicates correctness
function changeTileCorrect () {
  console.log('Executing changeTileCorrect');
  let tileList = document.getElementsByTagName('span');
  tileList[currentCharIndex].style.backgroundColor = 'lightgreen';
  console.log('Changed tile color');
}

// Changes the tile of the respective letter to a styling that indicates incorrectness
function changeTileWrong () {
  console.log('Executing changeTileWrong');
  let tileList = document.getElementsByTagName('span');
  tileList[currentCharIndex].style.backgroundColor = 'lightpink';
}

function checkWord () {
  console.log('Executing checkWord');
  if (currentInput === currentRandomWord) {
    document.getElementById('user-input').value = '';
    removeTilesForWord();
    myFunction();
    currentInput = '';
  }
}

function makeTilesForWord () {
  console.log('Executing makeTilesForWord()');
  for (let i = 0; i < currentRandomWord.length; i++) {
    let spanForChar = document.createElement('span');
    spanForChar.innerText = currentRandomWord[i];
    spanForChar.class = i + ' char-tile';
    document.body.appendChild(spanForChar);
  }
}

function removeTilesForWord () {
  console.log('removeTilesForWord()');
  let tileList = document.getElementsByTagName('span');
  for (let i = 0; i < currentRandomWord.length; i++) {
    console.log('tileList length=' + tileList.length);
    console.log('Removing' + tileList[i]);
    document.body.removeChild(tileList[0]);
  }
}
