const statement = document.getElementById("statement");

const optionButtons = document.getElementById("options").children;
const explanation = document.getElementById("explanation");

const nextQuestionButton = document.querySelector('[name="next"]');
const score = document.getElementById("score");
const questionCount = document.querySelector("#question-count");

const resetBtn = document.getElementById("reset");

const fact = {
  statement: "'1' + '1' === '2'",
  answer: false,
  explanation:
    "The plus operator concatenates (joins together) strings, so '1' + '1' === '11'.",
};

const facts = [
  {
    statement: "'5' - 3 === 2",
    answer: true,
    explanation:
      "When using the minus operator, JavaScript attempts to convert strings to numbers, so '5' - 3 is treated as 5 - 3, which equals 2.",
  },
  {
    statement: "[] == ![]",
    answer: true,
    explanation:
      "The empty array is a truthy value, but when used with `!`, it converts to `false`. So, `![]` becomes `false`, which is then coerced to `0`, making `[] == 0`, and since an empty array is loosely equal to `0`, the statement evaluates to `true`.",
  },
  {
    statement: "typeof NaN === 'number'",
    answer: true,
    explanation:
      "NaN (Not-a-Number) is actually of type 'number' in JavaScript, even though it represents an invalid number.",
  },
  {
    statement: "null == undefined",
    answer: true,
    explanation:
      "In loose equality (`==`), `null` and `undefined` are considered equal, but they are not equal when using strict equality (`===`).",
  },
  {
    statement: "0.1 + 0.2 === 0.3",
    answer: false,
    explanation:
      "Due to floating-point precision issues in JavaScript, `0.1 + 0.2` actually results in `0.30000000000000004`, not exactly `0.3`.",
  },
  {
    statement: "Function declarations are hoisted with their definitions",
    answer: true,
    explanation:
      "In JavaScript, function declarations are fully hoisted, meaning both the function name and its definition are available throughout the scope.",
  },
  {
    statement: "'b' + 'a' + +'a' + 'a' === 'banana'",
    answer: true,
    explanation:
      "The expression `+'a'` results in `NaN`, so the whole expression becomes `'b' + 'a' + 'NaN' + 'a'`, which evaluates to `'banana'`.",
  },
  {
    statement: "([] + {}).length === 15",
    answer: false,
    explanation:
      "`[] + {}` results in the string '[object Object]'. Since it has 15 characters, checking `.length` would return `15`, but the statement uses `===`, which checks for exact type match, making it false.",
  },
  {
    statement: "!![] === true",
    answer: true,
    explanation:
      "An empty array is a truthy value. Applying `!!` (double negation) converts it to `true`.",
  },
  {
    statement: "Infinity - Infinity === 0",
    answer: false,
    explanation:
      "Infinity minus Infinity is an indeterminate form in JavaScript and results in `NaN` (Not-a-Number), not `0`.",
  },
];

// NOTE: default state
let playerScore = 0;
let count = 0;
statement.textContent = facts[count].statement;
disable(nextQuestionButton);
resetBtn.classList.add("hidden");

// NOTE: functions
function disable(button) {
  return button.setAttribute("disabled", "");
}

const enable = (button) => button.removeAttribute("disabled");

const isCorrect = function (guess) {
  return guess === facts[count - 1].answer.toString();
};

nextQuestionButton.addEventListener("click", () => {
  statement.textContent = facts[count].statement;

  for (let button of optionButtons) {
    button.classList.remove("correct");
    button.classList.remove("incorrect");
    enable(button);
  }
  explanation.classList.add("hidden");
  disable(nextQuestionButton);
});

// NOTE: for of loop adds event listener to each button and shows explanation upon click
for (let button of optionButtons) {
  button.addEventListener("click", (event) => {
    const selectedOption = button.value;
    questionCount.textContent = count += 1;

    if (isCorrect(selectedOption)) {
      button.classList.add("correct");
      score.textContent = playerScore += 1;
    } else {
      button.classList.add("incorrect");
    }

    if (count === 10) {
      nextQuestionButton.textContent = "No more questions!";
      disable(nextQuestionButton);
      resetBtn.classList.remove("hidden");
    } else {
      enable(nextQuestionButton);
    }

    explanation.textContent = facts[count - 1].explanation;
    explanation.classList.remove("hidden");

    // NOTE: adds a disabled attribute to each button
    for (let button of optionButtons) {
      disable(button);
    }
  });
}

function reset() {
  playerScore = 0;
  count = 0;
  score.textContent = playerScore;
  questionCount.textContent = count;
  statement.textContent = facts[count].statement;
  nextQuestionButton.textContent = "Next Question";
  explanation.classList.add("hidden");

  for (let button of optionButtons) {
    button.classList.remove("correct");
    button.classList.remove("incorrect");
    enable(button);
  }
}

resetBtn.addEventListener("click", () => {
  reset();
  resetBtn.classList.add("hidden");
});
