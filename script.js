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
const questionTitle = document.querySelector("#question-title");
const backButton = document.querySelector("#back-button");

let activeQuestion = null;
let clearedQuestions = new Set();

function renderBoard() {
  board.replaceChildren();

  for (let rowIndex = 0; rowIndex < 5; rowIndex += 1) {
    const row = document.createElement("div");
    row.className = "brick-row";

    for (let columnIndex = 0; columnIndex < 5; columnIndex += 1) {
      const index = rowIndex * 5 + columnIndex;
      const brick = document.createElement("button");
      brick.type = "button";
      brick.className = clearedQuestions.has(index) ? "empty-brick" : "brick";
      brick.setAttribute("aria-label", `Question ${index + 1}`);

      if (!clearedQuestions.has(index)) {
        brick.addEventListener("click", () => showQuestion(index));
      } else {
        brick.disabled = true;
      }

      row.append(brick);
    }

    board.append(row);
  }
}

function showQuestion(index) {
  activeQuestion = index;
  const item = questions[index];
  questionTitle.textContent = item.question;
  boardView.hidden = true;
  questionView.hidden = false;
  backButton.focus();
}

function returnToBoard() {
  if (activeQuestion !== null) {
    clearedQuestions.add(activeQuestion);
    activeQuestion = null;
  }

  renderBoard();
  questionView.hidden = true;
  boardView.hidden = false;
}

backButton.addEventListener("click", returnToBoard);
renderBoard();
