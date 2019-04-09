// Authentication:
var provider = new firebase.auth.GoogleAuthProvider();

function signup(){
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // console.log("Created User:");
        // console.log(token,user);

        document.getElementsByClassName('signupButton')[0].style.display = "none";

      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
}

// Database:
// Adds user to leaderboard.
function addUser(){
    var user = firebase.auth().currentUser;
    if (user) {
    // User is signed in.
        var score = Math.floor(Math.random() * 100) + 1; // returns a random integer from 1 to 100
        var db = firebase.firestore();
        db.collection("leaderboard").doc(user.uid).set({
            score: parseInt(score),
            date: firebase.firestore.Timestamp.fromDate(new Date()),
            name: user.displayName
        })
        .then(function() {
            console.log("Document successfully written!");
            M.toast({html: 'You have submitted your score!'})

        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    } else {
    // No user is signed in.
        console.log('No user');
        signup(); // ?? Maybe? I'm not sure. I'm getting tired here.
    }
}

(function() {
    // your page initialization code here
    // the DOM will be available here
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log(user.displayName);
            // User is signed in.
            // console.log('Can log in!')
            document.getElementsByClassName('signupButton')[0].innerText = "Signed in!";
            document.getElementsByClassName('signupButton')[0].style.display = "none";

            // Display Leaderboard:
            // Get a reference to the database service
            var db = firebase.firestore();
            var docRef = db.collection("leaderboard");

            db.collection("leaderboard").orderBy('score','desc').get().then(function(querySnapshot) {
                // Create Table:
                var board = document.getElementById('tabledata');
                var tableBody = document.createElement('tbody');
                // var row = document.createElement("tr");

                // Create Headers:
                // var headers = ['Score','Name','Time']
                // for (var i = 0; i <=2; i++){
                //     var cell = document.createElement("td");
                //     var cellText = document.createTextNode(headers[i]);
                //     cell.appendChild(cellText);
                //     row.appendChild(cell);                
                // }
                // tableBody.appendChild(row);


                // var scores = [];
                // Iterate Through all Scores:
                querySnapshot.forEach(function(doc) {
                    var row = document.createElement("tr");

                    var values = doc.data()
                    // console.log(values);

                    // Name:
                    var cell = document.createElement("td");
                    var cellText = document.createTextNode(user.displayName);
                    cell.appendChild(cellText);
                    row.appendChild(cell);

                    // Score:
                    var cell = document.createElement("td");
                    var cellText = document.createTextNode(values['score']);
                    cell.appendChild(cellText);
                    row.appendChild(cell);

                    

                    // Date:
                    var cell = document.createElement("td");
                    var date = new Date(values['date']['seconds'] * 1000).toDateString();
                    // console.log(date);
                    var cellText = document.createTextNode(date);
                    cell.appendChild(cellText);
                    row.appendChild(cell);

                    tableBody.appendChild(row);
                    // scores.push(doc.data())
                });
                board.appendChild(tableBody);
                // console.log(scores);
            });

        } else {
            // User is signed out.
            document.getElementsByClassName('signupButton')[0].innerText = "Not Signed in!"
        }
    });

 })();