// Each teammate can add a new object here for their quiz question.
const questions = [
  {
    question: "What does HTML stand for?",
    choices: ["HyperText Markup Language", "HighText Machine Language", "Home Tool Markup Language", "Hyperlink Text Mode Language"],
    answer: 0
  },
  {
    question: "Which language is mainly used to style a web page?",
    choices: ["HTML", "CSS", "JavaScript", "SQL"],
    answer: 1
  },
  {
    question: "Which JavaScript method can respond to a button click?",
    choices: ["addEventListener", "makeButton", "styleButton", "clickPage"],
    answer: 0
  }
];

const questionText = document.querySelector("#question");
const choicesBox = document.querySelector("#choices");
const feedback = document.querySelector("#feedback");
const progress = document.querySelector("#progress");
const nextButton = document.querySelector("#next-button");
const restartButton = document.querySelector("#restart-button");
const quiz = document.querySelector("#quiz");
const results = document.querySelector("#results");
const scoreText = document.querySelector("#score");

let currentQuestion = 0;
let score = 0;

function showQuestion() {
  const item = questions[currentQuestion];
  questionText.textContent = item.question;
  progress.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  choicesBox.innerHTML = "";
  feedback.textContent = "";
  nextButton.disabled = true;
  nextButton.textContent = currentQuestion === questions.length - 1 ? "See results" : "Next question";

  item.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.className = "choice";
    button.textContent = choice;
    button.addEventListener("click", () => selectAnswer(index));
    choicesBox.append(button);
  });
}

function selectAnswer(selectedIndex) {
  const item = questions[currentQuestion];
  const buttons = choicesBox.querySelectorAll("button");
  const correct = selectedIndex === item.answer;

  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === item.answer) button.classList.add("correct");
    if (index === selectedIndex && !correct) button.classList.add("incorrect");
  });

  if (correct) {
    score++;
    feedback.textContent = "Correct! ✅";
  } else {
    feedback.textContent = `Not quite — the answer is ${item.choices[item.answer]}.`;
  }
  nextButton.disabled = false;
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) showQuestion();
  else showResults();
}

function showResults() {
  quiz.classList.add("hidden");
  results.classList.remove("hidden");
  progress.textContent = "All done";
  scoreText.textContent = `You scored ${score} out of ${questions.length}.`;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  results.classList.add("hidden");
  quiz.classList.remove("hidden");
  showQuestion();
}

nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", restartQuiz);
document.addEventListener("keydown", event => {
  if (event.key === "Enter" && !nextButton.disabled) nextQuestion();
});

showQuestion();
