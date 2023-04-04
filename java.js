

// event listener that initiates a countdown function when a button "start Quiz" is clicked
// add listener to listen for event on button element "start Quiz"
var btnStyle = "cursor:pointer;margin-top:20px;padding:10px 20px;border-radius:4px;border:none;text-align:center;text-decoration:none;display:inline-block;font-size:16px;font-weight:bold;vertical-align:middle;"

var startButton = document.getElementById("startQuiz");
var timerEl = document.getElementById("timer");
var questionEl = document.getElementById("question");
var choicesEl = document.getElementById("choices");
var scoreEl1 = document.getElementById("score");
var highScoreEl = document.getElementById("highscores");
var correctEl = document.getElementById("correct");
var IncorrectEl = document.getElementById("incorrect");
//grab the question elements frm the dom
var questions = [
{
    question:"Which of the following type of variable takes precedence over other if names are same?",
    choices: ["global variable", "local variable", "Both of the above.", "None of the above."],
    answer: "local variable"
},
{   question: "A variable is _________",
    choices: ["A container for a value", "A type of coffee", "A type of computer", "A type of dog"],
    answer: "A container for a value"
},
{  
    question:"Which of the following function of Array object extracts a section of an array and returns a new array?",
    choices: ["reverse()", "shift()", "slice()", "some()"],
    answer: "slice()"
},
{  
    question:"What is a JavaScript framework?",
    choices: ["A set of libraries and tools for developing web applications", "A programming language used for database management", "A type of computer", "A type of dog"],
    answer: "A set of libraries and tools for developing web applications"
},
{  
    question:" CSS stands for _________",
    choices: ["Cascadian Styling Sheet", "Communal Styling Sheet", "Computer Social Skills", "Custom Server Sheet"],
    answer: "Cascadian Styling Sheet"
},
{  
    question:"A function is _________",
    choices: ["A mathematical equation", "A vegetable", "A block of code designed to perform a particular task", "A block of code written in plain english"],
    answer: "A block of code designed to perform a particular task"
},
{  
    question:"HTML stands for _________",
    choices: ["Home Tool Markup Language", "Hyper Text Markup Language", "Hyperdiaper and Text Markup Language", "hoochie mama text markup language"],
    answer: "Hyper Text Markup Language"
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
    setTimeout(displayQuestion, 2000);
});

// function to start countdown
function startCountdown() {

    var timeInterval = setInterval(function () {
        secondsLeft--;

        // display countdown on page
        startButton.style.display = 'none'
        timerEl.style.display = 'block'
        timerEl.textContent = secondsLeft + " seconds left";

        if (secondsLeft <= 0){
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
      correctEl.style.display = "block";
    } else {
    //   decrement secondsLeft by 10
        secondsLeft -= 10;
        IncorrectEl.style.display = "block";
    }
  
    // increment current question and display next question
    setTimeout(function() {
    currentQuestion++;
    correctEl.style.display = "none";
    IncorrectEl.style.display = "none";
    if (currentQuestion < questions.length) {
      displayQuestion();
    } else {
      // end of quiz, display score
        
        leaderboards();
    }
  },1000);
  }
    function leaderboards() {
        choicesEl.style.display = "none";
        questionEl.textContent = "Quiz over. You scored " + score + " out of " + questions.length + ".";
        // display score and ask for initials
        scoreEl1.style.display = "block";
        scoreEl1.textContent = "Enter initials to save your score to the leaderboards: ";

        var initialsEl = document.createElement("input");
        initialsEl.setAttribute("type", "text");
        scoreEl1.appendChild(initialsEl);

        var submitButton = document.createElement("button")
        submitButton.textContent = "Submit"
        scoreEl1.appendChild(submitButton);

        submitButton.addEventListener("click", function(){
            var initials = initialsEl.value;
            var scores = JSON.parse(localStorage.getItem("scores")) || [];

            scores.push({initials: initials, score: score});

            localStorage.setItem("scores", JSON.stringify(scores));

            displayLeaderboard();
        });
    }

    function displayLeaderboard() {
        var leaderboardEl = document.getElementById("leaderboard");
        highScoreEl.style.display = "block";
        scoreEl1.style.display = "none";
        leaderboardEl.style.display = "block";
        questionEl.textContent = "Leaderboard";

        var scores = JSON.parse(localStorage.getItem("scores")) || [];

        scores.sort(function(a, b) {
            return b.score - a.score;
        });

        for (var i = 0; i < Math.min(scores.length, 10); i++) {
            var score = scores[i];
            var rank = i + 1;
            var scoreEl = document.createElement("p");
            scoreEl.textContent = rank + ".     " + score.initials + " - " + score.score;
            highScoreEl.appendChild(scoreEl);
        }
  
        var goBackButton = document.createElement("btn");
        goBackButton.textContent = "Go Back";
        goBackButton.addEventListener("click", goBack);
        goBackButton.style.cssText = btnStyle + "background-color:#4CAF50;color:white;";
        leaderboardEl.appendChild(goBackButton);


        var clearButton = document.createElement("btn");
        clearButton.textContent = "Clear Leaderboard";
        clearButton.addEventListener("click", clearLeaderboard);
        clearButton.style.cssText = btnStyle + "background-color:#f44336;color:white;";
        leaderboardEl.appendChild(clearButton);

    }




    function goBack() {
        location.reload();
    }


    function clearLeaderboard() {
        localStorage.removeItem("scores");
        highScoreEl.innerHTML = "";
    }