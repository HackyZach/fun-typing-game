console.log('Reading typing.js');
var currentRandomWord;
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
  // let tileList = document.getElementsByClassName('char-tile');
  let tileList = document.getElementById('inputView');
  tileList.children[currentCharIndex].style.backgroundColor = 'lightgreen';
  console.log('Changed tile color');
}

// Changes the tile of the respective letter to a styling that indicates incorrectness
function changeTileWrong () {
  console.log('Executing changeTileWrong');
  // let tileList = document.getElementsByClassName('char-tile');
  let tileList = document.getElementById('inputView');
  tileList.children[currentCharIndex].style.backgroundColor = 'lightpink';
}

function checkWord () {
  console.log('Executing checkWord');
  if (currentInput === currentRandomWord) {
    console.log('Before refreshing input tag');
    document.getElementById('user-input').value = '';
    inputView = document.getElementById('inputView');
    // inputView.innerText = '';
    while (inputView.firstChild) {
      inputView.removeChild(inputView.firstChild);
    }
    // inputView.class = '';
    myFunction();
    currentInput = '';
  }
}

function makeTilesForWord () {
  console.log('Executing makeTilesForWord()');
  console.log('currentrandomWord=' + currentRandomWord + 'in makeTilesForWord()');
  for (let i = 0; i < currentRandomWord.length; i++) {
    let spanForChar = document.createElement('span');
    spanForChar.innerText = currentRandomWord[i];
    spanForChar.class = i + ' char-tile';
    document.getElementById('inputView').appendChild(spanForChar);
  }
}
