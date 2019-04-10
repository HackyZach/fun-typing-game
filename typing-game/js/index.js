console.log('Reading index.js');
'use strict';

var word;

function myFunction () {
  
  inputView = document.getElementById('inputView');
  while (inputView.firstChild) {
    inputView.removeChild(inputView.firstChild);
  }

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
    if (request.readyState === 4 && request.status === 200) {
      console.log(request);
      let response = JSON.parse(request.responseText);
      word = response.word;
      console.log('Assigned word:' + word);
      document.getElementsByClassName('random-word')[0].innerHTML = 'Word: ' + word;
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
      currentRandomWord = word;
      console.log('Assigned currentRandomWord');
      makeTilesForWord();
    }
    console.log('End of onreadystatechange');
  };
}
