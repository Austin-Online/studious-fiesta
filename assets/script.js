  var quizContainer = document.getElementById('quiz-container');
  var startBtn = document.getElementById('start-btn');
  var questionElement = document.getElementById('question');
  var choicesContainer = document.getElementById('choices');
  var timerElement = document.getElementById('timer');
  var scoreboardContainer = document.getElementById('scoreboard-container');
  var scoreboardList = document.getElementById('scoreboard-list');
  
  let currentQuestion = 0;
  let score = 0;
  let timeLeft = 60;
  let timer;

// Quiz questions and answers
var quizData = [
    {
      question: "Question 1: What is the purpose of the 'fetch()' function in JavaScript?",
      choices: ["To fetch data from an API", "To fetch data from a local file", "To fetch data from a database", "To fetch data from the browser's cache"],
      correctAnswer: 1
    },
    {
      question: "Question 2: Which of the following is not a valid way to declare a JavaScript variable?",
      choices: ["let", "var", "const", "variable"],
      correctAnswer: 4
    },
    {
        question: "Question 3: What is the purpose of the 'querySelector()' method in JavaScript?",
        choices: ["To select and modify HTML elements", "To add event listeners", "To create new HTML elements", "To query data from a server"],
        correctAnswer: 1
      },
      {
        question: "Question 4: What is the purpose of the 'addEventListener()' method in JavaScript?",
        choices: ["To add styling to HTML elements", "To execute a function repeatedly at a specified interval", "To handle events and execute functions when an event occurs", "To create new HTML elements"],
        correctAnswer: 3
      },
      {
        question: "Question 5: What is the purpose of the 'localStorage' method in JavaScript?",
        choices: ["To store data on the server", "To store data temporarily on the server", "To store data in cookies", "To store data in a database"],
        correctAnswer: 2
      }
  ];
  

  
  // Load scoreboard from local storage
  let scoreboard = JSON.parse(localStorage.getItem('scoreboard')) || [];
  
  // Start Button Event Listener
  startBtn.addEventListener('click', startQuiz);
  
  // Start Quiz Function
  function startQuiz() {
    startBtn.classList.add('hide');
    quizContainer.classList.remove('hide');
    currentQuestion = 0;
    score = 0;
    timeLeft = 60;
    showQuestion();
    startTimer();
  }
  
  // Show question and choices
  function showQuestion() {
    var question = quizData[currentQuestion];
    questionElement.textContent = question.question;
  
// Clear previous choices
    choicesContainer.innerHTML = '';
  
    // Create and append choice buttons
    for (let i = 0; i < question.choices.length; i++) {
      var choice = document.createElement('button');
      choice.textContent = question.choices[i];
      choice.addEventListener('click', checkAnswer);
      choicesContainer.appendChild(choice);
    }
  }
  
  // Check answer function
  function checkAnswer(event) {
    var selectedChoice = event.target;
    var question = quizData[currentQuestion];
    var answerIndex = Array.from(choicesContainer.children).indexOf(selectedChoice);
    
    if (answerIndex === question.correctAnswer) {
      score++;
    } else {
        timeLeft -= 5;
        if (timeLeft < 0) {
          timeLeft = 0;
        }
      }
  
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      showQuestion();
    } else {
      endQuiz();
    }
  }
  
  // Start timer function
  function startTimer() {
    timer = setInterval(function() {
      timeLeft--;
      timerElement.textContent = `Time: ${timeLeft}s`;
      if (timeLeft <= 0) {
        endQuiz();
      }
    }, 1000);
  }
  
  // End quiz function
  function endQuiz() {
    clearInterval(timer);
    quizContainer.classList.add('hide');
    saveToScoreboard();
    showScoreboard();
  }
  
  // Save initials and score to the scoreboard
  function saveToScoreboard() {
    var initials = prompt('Enter your initials:');
    var entry = { initials, score };
    scoreboard.push(entry);
    // Sort the scoreboard by score in descending order
    scoreboard.sort((a, b) => b.score - a.score);
    // Storing scoreboard in local storage
    localStorage.setItem('scoreboard', JSON.stringify(scoreboard));
  }
  
  // Show scoreboard
  function showScoreboard() {
    scoreboardList.innerHTML = '';
    for (let i = 0; i < scoreboard.length; i++) {
      var entry = scoreboard[i];
      var listItem = document.createElement('li');
      listItem.textContent = `${entry.initials}: ${entry.score}`;
      scoreboardList.appendChild(listItem);
    }
    scoreboardContainer.classList.remove('hide');
  }