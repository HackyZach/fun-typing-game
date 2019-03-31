"use strict";

function myFunction() {
    document.getElementsByClassName("random-word")[0].innerHTML = "Word: Request Sent!";
    document.getElementsByClassName("random-word-definition")[0].innerHTML = "Definition: Request Sent!";
    
    /*Sends Request*/
    const request = new XMLHttpRequest();
    request.open("GET", "https://wordsapiv1.p.rapidapi.com/words/?random=true")
    request.setRequestHeader("X-RapidAPI-Key", config.API_KEY);
    request.setRequestHeader("Accept", "application/json")
    request.send();

    /*Receives Response*/
    request.onreadystatechange=(e)=>{
        let response = JSON.parse(request.responseText);
        let word = response.word;
        
        document.getElementsByClassName("random-word")[0].innerHTML = "Word: " + word;
        
        if(response.results) {
            if(response.results[0].definition) {
                let definition = response.results[0].definition;
                document.getElementsByClassName("random-word-definition")[0].innerHTML = "Definition: " + definition;
            } else {
                document.getElementsByClassName("random-word-definition")[0].innerHTML = "Definition: not included in response."
            }
        } else {
            document.getElementsByClassName("random-word-definition")[0].innerHTML = "Definition: not included in response."
        }
    }   
}