const quizData = [
    {
      question: 'HTML stands for?',
      options: ['Hyper Text Markup Language', 'Hyper Text Programming Language', 'Hyper Text Styling Language', 'Hyper Text Scripting Language'],
      answer: 'Hyper Text Markup Language',
    },
    {
      question: 'Which language is used for styling web pages?',
      options: [  "HTML",
         "CSS",
        "JavaScript",
         "PHP"],
      answer: 'CSS',
    },
    {
      question: 'Which of these is a JavaScript framework?',
      options: [  "Django",
        "React",
        "Laravel",
         "Bootstrap"],
      answer: 'React',
    },
    {
      question: 'Which tag is used to define a hyperlink in HTML?',
      options: ["link","a","href","url" ],
      answer: 'a',
    },
    {
      question: 'Which company developed JavaScript?',
      options: [
        "Microsoft",
        "Netscape",
        "Oracle",
        "Sun Microsystems"
      ],
      answer: 'Netscape',
    },
    {
      question: 'Which of these is not a programming language?',
      options: ["Python","HTML","Java","C++"],
      answer: 'HTML',
    },
    {
      question: 'What does CSS stand for?',
      options: [
        "Creative Style Sheets",
        "Cascading Style Sheets",
        "Colorful Style Sheets",
        "Cascading Script Sheets"
      ],
      answer: 'Cascading Style Sheets',
    },
    {
      question: 'Which HTML tag is used to define a table?',
      options: ["table","thead","tr","tb"],
      answer: 'table',
    },
    {
      question: 'Which HTML tag is used to display an image?',
      options: [
        "img",
        "image",
        "picture",
        "src"
      ],
      answer: 'img',
    },
    {
      question: 'Which one is not a JavaScript data type?',
      options: ["String","Boolean","Object","Function"],
      answer: 'Function',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();