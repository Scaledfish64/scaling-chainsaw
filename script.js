const questions = [
  "How long was the Berlin Wall?",
  "Approximately how tall was the concrete portion of the Berlin Wall?",
  "What was the dangerous area between the wall's barriers called?",
  'How do you say "wall" in German?',
  "What material was used to reinforce the Berlin Wall?",
  "In what year was the Berlin Wall constructed?",
  "Which government constructed the Berlin Wall?",
  "On what date did construction of the Berlin Wall begin?",
  "Which city were East German citizens attempting to flee into?",
  "What was the political ideology of East Germany's government?",
  "What famous checkpoint was associated with crossing between East and West Berlin?",
  'How do you say "freedom" in German?',
  "Which side of Berlin was controlled by the communist government?",
  'How do you say "family" in German?',
  'How do you say "escape" in German?',
  "What were the weekly peaceful protests against the East German regime called?",
  "In which German city did 70,000–100,000 people march on October 9, 1989?",
  "On what date did the massive Leipzig demonstration take place?",
  "Where did approximately 500,000 people gather for a massive anti-regime rally?",
  "On what date did the Alexanderplatz rally take place?",
  "In what year did the Berlin Wall fall?",
  "In what month did the Berlin Wall open?",
  "On what exact date did the Berlin Wall open?",
  "Approximately how many people attended the Alexanderplatz rally?",
  "What type of demonstrations helped challenge the East German government?",
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
  questionTitle.textContent = questions[index];
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
