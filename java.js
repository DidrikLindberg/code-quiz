

// event listener that initiates a countdown function when a button "start Quiz" is clicked
// add listener to listen for event on button element "start Quiz"
var startButton = document.getElementById("startQuiz");
var timerEl = document.getElementById("timer");
var questionEl = document.getElementById("question");
var choicesEl = document.getElementById("choices");
var scoreEl = document.getElementById("score");
var highScoreEl = document.getElementById("highScores");
//grab the question elements frm the dom
var questions = [
{
    question:"what is JavaScript?",
    choices: ["A programming language", "A type of coffee", "A type of computer", "A type of dog"],
    answer: "A programming language"
},
{   question: "what is a variable?",
    choices: ["A container for a value", "A type of coffee", "A type of computer", "A type of dog"],
    answer: "A container for a value"
},
{  
    question:"what is a function?",
    choices: ["A container for a value", "A type of coffee", "A type of computer", "A type of dog"],
    answer: "A container for a value"
},


];


// set current Question and score variable
var currentQuestion = 0;
var score = 0;
var secondsLeft = 60;



startButton.addEventListener("click", function () {
    console.log("start quiz button clicked");
    // call function to start countdown
    startCountdown();
    // call function to display question
    displayQuestion();
});

// function to start countdown
function startCountdown() {

    var timeInterval = setInterval(function () {
        secondsLeft--;

        // display countdown on page
        startButton.style.display = 'none'
        timerEl.style.display = 'block'
        timerEl.textContent = secondsLeft + " seconds left";

        if (secondsLeft === 0){
        clearInterval(timeInterval);
        timerEl.textContent = "Time is up!";
        
        
        }
    }, 1000);
}

// function to display question
function displayQuestion() {
    //get the current question from array
    var question = questions[currentQuestion];
    //display the question
    questionEl.textContent = question.question;
    choicesEl.style.display = "block";
    //display the choices
    choicesEl.innerHTML = "";
    for (var i = 0; i < question.choices.length; i++) {
        var choice = question.choices[i];
        var choiceEl = document.createElement("button");
        choiceEl.textContent = choice;
        choiceEl.setAttribute("data-answer", choice);
        choiceEl.addEventListener("click", checkAnswer);
        choicesEl.appendChild(choiceEl);
      }
    }
    // function to check answer
function checkAnswer(event) {
    // get user's answer from button element
    var userAnswer = event.target.getAttribute("data-answer");
  
    // get correct answer from array
    var correctAnswer = questions[currentQuestion].answer;
  
    // check if user's answer is correct
    if (userAnswer === correctAnswer) {
      score++;
      alert("Correct!");
    } else {
    //   decrement secondsLeft by 10
    secondsLeft -= 10;
      alert("Incorrect.");
    }
  
    // increment current question and display next question
    currentQuestion++;
    if (currentQuestion < questions.length) {
      displayQuestion();
    } else {
      // end of quiz, display score
        choicesEl.style.display = "none";
        questionEl.textContent = "Quiz over. You scored " + score + " out of " + questions.length + ".";
        startButton.style.display = "block";
        startButton.textContent = "Try again?";
      alert("Quiz over. You scored " + score + " out of " + questions.length + ".");
    }
  }
  

