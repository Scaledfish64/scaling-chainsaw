const questions = [
  { category: "Science", question: "What is the only metal that is liquid at room temperature?" },
  { category: "History", question: "Which ancient civilization built Machu Picchu?" },
  { category: "Nature", question: "What is the fastest land animal in the world?" },
  { category: "Culture", question: "Which instrument has 88 keys?" },
  { category: "Geography", question: "What is the largest ocean on Earth?" },
  { category: "Science", question: "What gas do plants absorb from the atmosphere?" },
  { category: "History", question: "Who was the first person to walk on the Moon?" },
  { category: "Nature", question: "How many hearts does an octopus have?" },
  { category: "Culture", question: "Which artist painted the Mona Lisa?" },
  { category: "Geography", question: "What is the capital city of Japan?" },
  { category: "Science", question: "What is the hardest natural substance on Earth?" },
  { category: "History", question: "The Great Pyramid of Giza was built in which country?" },
  { category: "Nature", question: "What is a group of lions called?" },
  { category: "Culture", question: "In which sport would you perform a slam dunk?" },
  { category: "Geography", question: "Which country is shaped like a boot?" },
  { category: "Science", question: "How many bones are in the adult human body?" },
  { category: "History", question: "Which ship famously sank on its maiden voyage in 1912?" },
  { category: "Nature", question: "What is the largest mammal in the world?" },
  { category: "Culture", question: "Which fictional detective lived at 221B Baker Street?" },
  { category: "Geography", question: "What is the smallest country in the world?" },
  { category: "Science", question: "What is the closest planet to the Sun?" },
  { category: "History", question: "The Renaissance began in which European country?" },
  { category: "Nature", question: "What is the process by which a caterpillar becomes a butterfly?" },
  { category: "Culture", question: "Which band released the album Abbey Road?" },
  { category: "Geography", question: "What is the longest river in South America?" },
];

const board = document.querySelector("#board");
const boardView = document.querySelector("#board-view");
const questionView = document.querySelector("#question-view");
const completeView = document.querySelector("#complete-view");
const questionCategory = document.querySelector("#question-category");
const questionNumber = document.querySelector("#question-number");
const questionTitle = document.querySelector("#question-title");
const backButton = document.querySelector("#back-button");
const resetButton = document.querySelector("#reset-button");
const clearedCount = document.querySelector("#cleared-count");
const progressBar = document.querySelector("#progress-bar");

let activeQuestion = null;
let clearedQuestions = new Set();

function renderBoard() {
  board.replaceChildren();

  questions.forEach((item, index) => {
    if (clearedQuestions.has(index)) {
      return;
    }

    const brick = document.createElement("button");
    brick.type = "button";
    brick.className = "brick";
    brick.innerHTML = `
      <span class="brick-number">BRICK ${String(index + 1).padStart(2, "0")}</span>
      <span class="brick-category">${item.category}</span>
    `;
    brick.addEventListener("click", () => showQuestion(index));
    board.append(brick);
  });

  const cleared = clearedQuestions.size;
  clearedCount.textContent = cleared;
  progressBar.style.width = `${(cleared / questions.length) * 100}%`;
}

function showQuestion(index) {
  activeQuestion = index;
  const item = questions[index];
  questionCategory.textContent = item.category.toUpperCase();
  questionNumber.textContent = `QUESTION ${String(index + 1).padStart(2, "0")}`;
  questionTitle.textContent = item.question;
  boardView.hidden = true;
  questionView.hidden = false;
  completeView.hidden = true;
  backButton.focus();
}

function returnToBoard() {
  if (activeQuestion !== null) {
    clearedQuestions.add(activeQuestion);
    activeQuestion = null;
  }

  renderBoard();
  questionView.hidden = true;
  completeView.hidden = clearedQuestions.size !== questions.length;
  boardView.hidden = !completeView.hidden;

  if (!completeView.hidden) {
    resetButton.focus();
  }
}

function resetGame() {
  clearedQuestions = new Set();
  renderBoard();
  completeView.hidden = true;
  boardView.hidden = false;
  document.querySelector(".brick")?.focus();
}

backButton.addEventListener("click", returnToBoard);
resetButton.addEventListener("click", resetGame);
renderBoard();
