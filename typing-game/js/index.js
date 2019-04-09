'use strict';

function myFunction () {
  document.getElementsByClassName('random-word')[0].innerHTML = 'Word: Request Sent!';
  document.getElementsByClassName('random-word-definition')[0].innerHTML = 'Definition: Request Sent!';

  /* Sends Request  */
  console.log('request');
  const request = new XMLHttpRequest();
  request.open('GET', 'https://wordsapiv1.p.rapidapi.com/words/?random=true');
  request.setRequestHeader('X-RapidAPI-Key', config.API_KEY);
  request.setRequestHeader('Accept', 'application/json');
  request.send();

  /*    Receives Response   */
  console.log('onreadystatechange');
  request.onreadystatechange = (e) => {
    let response = JSON.parse(request.responseText);
    let word = response.word;       
    document.getElementsByClassName('random-word')[0].innerHTML = 'Word: ' + word;
    currentRandomWord = word; // need because separate files
    console.log('Assigned currentRandomWord');
    if (response.results) {
      if (response.results[0].definition) {
        let definition = response.results[0].definition;
        document.getElementsByClassName('random-word-definition')[0].innerHTML = 'Definition: ' + definition;
      } else {
        document.getElementsByClassName('random-word-definition')[0].innerHTML = 'Definition: not included in response.';
      }
    } else {
      document.getElementsByClassName('random-word-definition')[0].innerHTML = 'Definition: not included in response.';
    }
  };
  makeTilesForWord();
}

var currentRandomWord;
var currentInput = '';

function updateCurrentInput (event) {
  let currentInputChar = event.key;
  if (currentInputChar === 'Backspace') { 
    currentInput = currentInput.slice(0, currentInput.length - 1);
  } else {
    currentInput += currentInputChar;
  }
  console.log(currentInput);
  checkWord();
}

function checkWord () {
  if (currentInput === currentRandomWord) {
    document.getElementById('user-input').value = '';
    myFunction();
    currentInput = '';
  }
}

function makeTilesForWord () {
  console.log('Invoked makeTilesForWord()');
  console.log(currentRandomWord);
  for (let i = 0; i < currentRandomWord.length; i++) {
    let spanForChar = document.createElement('span').innerTExt = currentRandomWord[i];
    document.body.appendChild(spanForChar);
  }
}

// function currentInputOnTrack () {
//   let currentInputSize = currentInput.length;
//   let substrCurrRandomWord = currentRandomWord.slice(0, currentInputSize + 1);
//   if (substrCurrRandomWord === currentInput)
// }
