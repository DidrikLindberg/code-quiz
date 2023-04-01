

// event listener that initiates a countdown function when a button "start Quiz" is clicked
// add listener to listen for event on button element "start Quiz"
var startButton = document.getElementById("startQuiz");
var timerEl = document.getElementById("timer");

var secondsLeft = 0;


startButton.addEventListener("click", function () {
    console.log("start quiz button clicked");
    // call function to start countdown
    startCountdown();
});

// function to start countdown
function startCountdown() {
    var timeInterval = setInterval(function () {
        secondsLeft--;

        // display countdown on page
        timerEl.textContent = secondsLeft + " seconds left";

        if (secondsLeft === 0){
        clearInterval(timeInterval);
        sendMessage();
        }
    }, 1000);
}

// function to display message when countdown is over
function sendMessage() {
    timerEl.textContent = "Time is up!";
}