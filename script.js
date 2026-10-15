// =============================================
// SHADOW MISSION - OFFLINE PUZZLE GAME
// =============================================
"use strict";

const missions = [
  { id: 1, title: "Crack the Code", description: "Solve a fresh puzzle each time." , points: 100 },
  { id: 2, title: "Find the Clue", description: "Discover the hidden word.", points: 150 },
  { id: 3, title: "Escape Room", description: "Solve the final riddle to escape.", points: 200 }
];

// Each mission has multiple puzzles. The game avoids showing the same puzzle
// twice in a row for that mission, even after closing and reopening the page.
const questionSets = {
  1: [
    { question: "2, 4, 8, 14, ?", answer: "22", hint: "The differences are +2, +4, +6. What comes next?" },
    { question: "3, 6, 11, 18, ?", answer: "27", hint: "The differences are +3, +5, +7..." },
    { question: "1, 4, 9, 16, ?", answer: "25", hint: "These are square numbers." },
    { question: "5, 10, 20, 40, ?", answer: "80", hint: "Each number doubles." },
    { question: "10, เม, 30, 40, ?", answer: "50", hint: "Count by tens. Type the missing next number." },
    { question: "2, 5, 10, 17, ?", answer: "26", hint: "Add odd numbers: +3, +5, +7..." },
    { question: "81, 27, 9, 3, ?", answer: "1", hint: "Divide by 3 each time." },
    { question: "7, 14, 21, 28, ?", answer: "35", hint: "Add 7 each time." },
    { question: "1, 1, 2, 3, 5, ?", answer: "8", hint: "Add the previous two numbers." },
    { question: "100, 90, 80, 70, ?", answer: "60", hint: "Subtract 10 each time." },
    { question: '4, 8, 12, 16, ?', answer: '20', hint: 'Add 4 each time.' },
    { question: '9, 18, 27, 36, ?', answer: '45', hint: 'Add 9 each time.' },
    { question: '50, 45, 40, 35, ?', answer: '30', hint: 'Subtract 5 each time.' },
    { question: '1, 3, 6, 10, ?', answer: '15', hint: 'Add 2, then 3, then 4, then 5.' },
    { question: '2, 6, 18, 54, ?', answer: '162', hint: 'Multiply by 3 each time.' },
    { question: '64, 32, 16, 8, ?', answer: '4', hint: 'Divide by 2 each time.' },
    { question: '11, 22, 33, 44, ?', answer: '55', hint: 'Add 11 each time.' },
    { question: '3, 9, 27, ?', answer: '81', hint: 'Multiply by 3.' },
    { question: '1, 8, 27, 64, ?', answer: '125', hint: 'These are cubes: 1³, 2³, 3³, 4³, 5³.' },
    { question: '20, 18, 16, 14, ?', answer: '12', hint: 'Subtract 2 each time.' },
    { question: '6, 12, 18, 24, ?', answer: '30', hint: 'Add 6 each time.' },
    { question: '2, 3, 5, 8, 12, ?', answer: '17', hint: 'Add 1, 2, 3, 4, then 5.' },
    { question: '90, 80, 70, 60, ?', answer: '50', hint: 'Subtract 10 each time.' },
    { question: '1, 2, 4, 7, 11, ?', answer: '16', hint: 'Add 1, 2, 3, 4, then 5.' },
    { question: '5, 15, 25, 35, ?', answer: '45', hint: 'Add 10 each time.' },
    { question: '121, 100, 81, 64, ?', answer: '49', hint: 'These are descending squares: 11², 10², 9², 8², 7².' },
    { question: '8, 16, 24, 32, ?', answer: '40', hint: 'Add 8 each time.' },
    { question: '13, 26, 39, 52, ?', answer: '65', hint: 'Add 13 each time.' },
    { question: '7, 10, 13, 16, ?', answer: '19', hint: 'Add 3 each time.' },
    { question: '2, 4, 6, 8, ?', answer: '10', hint: 'Even numbers in order.' },
    { question: '1, 5, 9, 13, ?', answer: '17', hint: 'Add 4 each time.' },
    { question: '40, 35, 30, 25, ?', answer: '20', hint: 'Subtract 5 each time.' },
    { question: '3, 7, 11, 15, ?', answer: '19', hint: 'Add 4 each time.' },
    { question: '1, 4, 7, 10, ?', answer: '13', hint: 'Add 3 each time.' }
  ],
  2: [
    { question: "S — Search carefully<br>H — Hidden clues matter<br>A — Analyze the pattern<br>D — Decode the message<br>O — Observe everything<br>W — Win the mission<br><br>Enter the word formed by the first letters.", answer: "SHADOW", hint: "Read the first letter of each line." },
    { question: "Unscramble these letters: L I S T E N. Make a word that means quiet.", answer: "SILENT", hint: "Use all six letters." },
    { question: "Unscramble these letters: P E N. What do you use to write?", answer: "PEN", hint: "It is a common writing tool." },
    { question: "What word is the opposite of LONG?", answer: "SHORT", hint: "It describes a small length." },
    { question: "Find the odd one out: APPLE, BANANA, CARROT, MANGO. Type the odd one.", answer: "CARROT", hint: "One is usually treated as a vegetable." },
    { question: "What comes next in the letters? A, C, E, G, ?", answer: "I", hint: "Skip one letter each time." },
    { question: "Rearrange LISTEN to make a word meaning quiet.", answer: "SILENT", hint: "Use all six letters." },
    { question: "I have a face and two hands but no arms or legs. What am I?", answer: "CLOCK", hint: "You look at me to know the time." },
    { question: "What is the first letter of the word SHADOW?", answer: "S", hint: "Look at the very beginning of SHADOW." },
    { question: "What has one eye but cannot see?", answer: "NEEDLE", hint: "It is used for sewing." },
    { question: 'Unscramble: R A E H T. Which body part pumps blood?', answer: 'HEART', hint: 'It beats inside your chest.' },
    { question: 'What is the opposite of DARK?', answer: 'LIGHT', hint: 'It helps you see.' },
    { question: 'Which does not belong: DOG, CAT, ROSE, COW?', answer: 'ROSE', hint: 'Three are animals.' },
    { question: 'Complete the word: C _ O C K (tells time).', answer: 'L', hint: 'The missing letter goes after C.' },
    { question: 'What is the first letter of MYSTERY?', answer: 'M', hint: 'Read the first character.' },
    { question: 'Unscramble: A C T. What do performers do?', answer: 'ACT', hint: 'A short word for performing.' },
    { question: 'Which is different: RED, BLUE, GREEN, TABLE?', answer: 'TABLE', hint: 'Three are colours.' },
    { question: 'What is the opposite of OPEN?', answer: 'CLOSED', hint: 'A door can be this.' },
    { question: 'Complete: B, D, F, H, ?', answer: 'J', hint: 'Skip one letter each time.' },
    { question: 'What do bees make?', answer: 'HONEY', hint: 'A sweet food.' },
    { question: 'Which is not a planet: MARS, EARTH, MOON, VENUS?', answer: 'MOON', hint: 'It orbits a planet.' },
    { question: 'Unscramble: R A I N. Water falling from clouds.', answer: 'RAIN', hint: 'It falls from clouds.' },
    { question: 'What is the opposite of EARLY?', answer: 'LATE', hint: 'Not on time at the beginning.' },
    { question: 'Which is the odd one out: BUS, CAR, TRAIN, BANANA?', answer: 'BANANA', hint: 'Three are vehicles.' },
    { question: 'Complete the letters: Z, X, V, T, ?', answer: 'R', hint: 'Move backwards by two letters.' },
    { question: 'What do you call a baby dog?', answer: 'PUPPY', hint: 'A young canine.' },
    { question: 'Which is different: CIRCLE, SQUARE, TRIANGLE, BANANA?', answer: 'BANANA', hint: 'Three are shapes.' },
    { question: 'Unscramble: P L A N E T. What is Earth?', answer: 'PLANET', hint: 'Earth belongs to this category.' },
    { question: 'What is the opposite of EMPTY?', answer: 'FULL', hint: 'A container with nothing missing.' },
    { question: 'Which is not a weekday: MONDAY, FRIDAY, SUNDAY, JANUARY?', answer: 'JANUARY', hint: 'It is a month.' },
    { question: 'Complete: A, D, G, J, ?', answer: 'M', hint: 'Move forward three letters.' },
    { question: 'What do you use to unlock a door?', answer: 'KEY', hint: 'It fits into a lock.' },
    { question: 'Which is the odd one: SPOON, FORK, PLATE, SHOE?', answer: 'SHOE', hint: 'Three are used for eating.' }
  ],
  3: [
    { question: "I have keys but no locks. I have space but no room. You can enter, but you cannot go outside. What am I?", answer: "KEYBOARD", hint: "You use it to type on a computer." },
    { question: "What has cities but no houses, forests but no trees, and water but no fish?", answer: "MAP", hint: "You use it to find places." },
    { question: "The more you take, the more you leave behind. What are they?", answer: "FOOTSTEPS", hint: "You leave them as you walk." },
    { question: "What gets wetter the more it dries?", answer: "TOWEL", hint: "You use it after a shower." },
    { question: "I speak without a mouth and hear without ears. I have no body, but I come alive with sound. What am I?", answer: "ECHO", hint: "You may hear me in a mountain tunnel." },
    { question: "What has a neck but no head?", answer: "BOTTLE", hint: "You might drink water from it." },
    { question: "What can travel around the world while staying in one corner?", answer: "STAMP", hint: "It goes on an envelope." },
    { question: "What has many teeth but cannot bite?", answer: "COMB", hint: "You use it to arrange your hair." },
    { question: "I am full of holes but can still hold water. What am I?", answer: "SPONGE", hint: "You use me for cleaning." },
    { question: "What has hands but cannot clap?", answer: "CLOCK", hint: "It tells the time." },
    { question: 'What has a ring but no finger?', answer: 'PHONE', hint: 'It can ring when someone calls.' },
    { question: 'What has four legs but cannot walk?', answer: 'TABLE', hint: 'You put things on it.' },
    { question: 'What has a head and a tail but no body?', answer: 'COIN', hint: 'It is used as money.' },
    { question: 'What can you catch but not throw?', answer: 'COLD', hint: 'It is an illness.' },
    { question: 'What has words but never speaks?', answer: 'BOOK', hint: 'You read it.' },
    { question: 'What goes up but never comes down?', answer: 'AGE', hint: 'It increases as time passes.' },
    { question: 'What has one thumb and four fingers but is not alive?', answer: 'GLOVE', hint: 'You wear it on your hand.' },
    { question: 'What has a bottom at the top?', answer: 'LEG', hint: 'A leg has a bottom/foot at its end.' },
    { question: 'What has many pages but is not a book? A web browser has many open ____.', answer: 'TABS', hint: 'They appear across the top.' },
    { question: 'What has branches but no fruit, trunk, or leaves?', answer: 'BANK', hint: 'A bank has branches in different places.' },
    { question: 'What begins with T, ends with T, and has T inside?', answer: 'TEAPOT', hint: 'It holds tea.' },
    { question: 'What can fill a room but takes up no space?', answer: 'LIGHT', hint: 'It shines around a room.' },
    { question: 'What has a bed but never sleeps and a mouth but never eats?', answer: 'RIVER', hint: 'Water flows through it.' },
    { question: 'What has 13 hearts but no other organs?', answer: 'DECK', hint: 'A deck of playing cards has 13 hearts.' },
    { question: 'What has lots of eyes but cannot see? A potato has many ____.', answer: 'EYES', hint: 'They are small spots on a potato.' },
    { question: 'What is always in front of you but cannot be seen?', answer: 'FUTURE', hint: 'It has not happened yet.' },
    { question: 'What has a spine but no bones?', answer: 'BOOK', hint: 'Its spine holds the pages together.' },
    { question: 'What gets bigger the more you take away from it?', answer: 'HOLE', hint: 'Removing material makes it larger.' },
    { question: 'What has cities and roads but no people or cars?', answer: 'MAP', hint: 'It shows places.' },
    { question: 'What can run but has no legs?', answer: 'WATER', hint: 'It flows in a stream.' },
    { question: 'What has ears but cannot hear?', answer: 'CORN', hint: 'Corn has ears.' },
    { question: 'What is easy to lift but hard to throw?', answer: 'FEATHER', hint: 'It is very light.' },
    { question: 'What has a lock but no door?', answer: 'HAIR', hint: 'A curl of hair can be called a lock.' }
  ]
};

const STORAGE_SCORE = "shadowMissionScore_v1";
const STORAGE_COMPLETED = "shadowMissionCompleted_v1";
const STORAGE_LAST_QUESTIONS = "shadowMissionLastQuestions_v1";

let currentMission = null;
let completedMissions = loadCompleted();
let totalScore = loadScore();
let answerLocked = false;

function $(id) {
  return document.getElementById(id);
}

function loadCompleted() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_COMPLETED) || "[]");
    if (!Array.isArray(value)) return [];
    return value.filter(function (id) {
      return missions.some(function (mission) {
        return mission.id === id;
      });
    });
  } catch (error) {
    return [];
  }
}

function loadScore() {
  try {
    const value = Number(localStorage.getItem(STORAGE_SCORE) || 0);
    return Number.isFinite(value) && value >= 0 ? value : 0;
  } catch (error) {
    return 0;
  }
}

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_COMPLETED, JSON.stringify(completedMissions));
    localStorage.setItem(STORAGE_SCORE, String(totalScore));
  } catch (error) {
    console.warn("Could not save progress in this browser.", error);
  }
}

function showScreen(screenId) {
  ["homeScreen", "gameScreen", "completeScreen"].forEach(function (id) {
    const element = $(id);
    if (element) element.classList.add("hidden");
  });

  const target = $(screenId);
  if (target) target.classList.remove("hidden");
}

function isUnlocked(missionId) {
  return missionId === 1 || completedMissions.includes(missionId - 1);
}

function updateHome() {
  if ($("totalScore")) $("totalScore").textContent = String(totalScore);
  if ($("completedCount")) $("completedCount").textContent = String(completedMissions.length);

  missions.forEach(function (mission) {
    const status = $("missionStatus" + mission.id);
    const card = document.querySelector('[data-mission="' + mission.id + '"]');
    if (!status) return;

    if (completedMissions.includes(mission.id)) {
      status.textContent = "COMPLETED";
      if (card) card.dataset.locked = "false";
    } else if (isUnlocked(mission.id)) {
      status.textContent = "START";
      if (card) card.dataset.locked = "false";
    } else {
      status.textContent = "LOCKED";
      if (card) card.dataset.locked = "true";
    }
  });
}

function setFeedback(message, type) {
  const feedback = $("feedback");
  if (!feedback) return;
  feedback.textContent = message;
  feedback.className = "feedback" + (type ? " " + type : "");
}

function openMission(missionId) {
  const mission = missions.find(function (item) {
    return item.id === missionId;
  });

  if (!mission) return;

  if (!isUnlocked(missionId)) {
    window.alert("MISSION LOCKED — complete the previous mission first.");
    return;
  }

  const pool = questionSets[mission.id] || [];
  let lastQuestions = {};
  try { lastQuestions = JSON.parse(localStorage.getItem(STORAGE_LAST_QUESTIONS) || "{}"); } catch (error) {}
  const previous = lastQuestions[String(mission.id)];
  let choices = pool.filter(function (item) { return item.question !== previous; });
  if (!choices.length) choices = pool;
  const puzzle = choices[Math.floor(Math.random() * choices.length)];
  lastQuestions[String(mission.id)] = puzzle.question;
  try { localStorage.setItem(STORAGE_LAST_QUESTIONS, JSON.stringify(lastQuestions)); } catch (error) {}

  currentMission = Object.assign({}, mission, puzzle);
  answerLocked = false;

  $("missionNumber").textContent = "MISSION " + String(mission.id).padStart(2, "0");
  $("missionTitle").textContent = mission.title;
  $("missionDescription").textContent = mission.description;
  $("gameContent").innerHTML = puzzle.question;
$("answerInput").value = "";
$("answerInput").disabled = false;

const submit = $("answerForm").querySelector('button[type="submit"]');
if (submit) submit.disabled = false;

const feedback = $("feedback");
if (feedback) {
  feedback.textContent = "";
  feedback.className = "feedback hidden";
}

  showScreen("gameScreen");
}

function checkAnswer(event) {
  event.preventDefault();
  if (!currentMission || answerLocked) return;

  const answerInput = $("answerInput");
  const userAnswer = answerInput.value.trim().toUpperCase();

  if (!userAnswer) {
    setFeedback("Enter an answer first, Agent.", "error");
    answerInput.focus();
    return;
  }

  if (userAnswer !== currentMission.answer.toUpperCase()) {
    setFeedback("Not quite. Try again or use a hint.", "error");
    answerInput.select();
    return;
  }

  answerLocked = true;

if (!completedMissions.includes(currentMission.id)) {
  completedMissions.push(currentMission.id);
  totalScore += currentMission.points;
}

saveProgress();
updateHome();

  answerInput.disabled = true;
  const submit = $("answerForm").querySelector('button[type="submit"]');
  if (submit) submit.disabled = true;

  setFeedback("ACCESS GRANTED — +" + currentMission.points + " points!", "success");

  window.setTimeout(function () {
    $("completionMessage").textContent = "You completed " + currentMission.title + ". Excellent work, Agent.";
    $("rewardPoints").textContent = "+" + currentMission.points + " XP";
    const next = missions.find(function (mission) {
      return !completedMissions.includes(mission.id) && isUnlocked(mission.id);
    });
    $("nextButton").textContent = next ? "NEXT MISSION ↗" : "VIEW RESULTS ↗";
    showScreen("completeScreen");
  }, 650);
}

function showHint() {
  if (!currentMission) return;
  setFeedback("HINT: " + currentMission.hint, "");
}

function nextMission() {
  const next = missions.find(function (mission) {
    return !completedMissions.includes(mission.id) && isUnlocked(mission.id);
  });

  if (next) {
    openMission(next.id);
    return;
  }

  showScreen("homeScreen");
  updateHome();
  if (completedMissions.length === missions.length) {
    window.alert("All missions cleared! You are a Shadow Mission master.");
  }
}

function goHome() {
  showScreen("homeScreen");
  updateHome();
}

function setupGame() {
  const startButton = $("startButton");
  if (startButton) startButton.addEventListener("click", nextMission);

  const form = $("answerForm");
  if (form) form.addEventListener("submit", checkAnswer);

  const hintButton = $("hintButton");
  if (hintButton) hintButton.addEventListener("click", showHint);

  const backButton = $("backButton");
  if (backButton) backButton.addEventListener("click", goHome);

  const nextButton = $("nextButton");
  if (nextButton) nextButton.addEventListener("click", nextMission);

  const homeButton = $("homeButton");
  if (homeButton) homeButton.addEventListener("click", goHome);

  const brandHome = $("brandHome");
  if (brandHome) {
    brandHome.addEventListener("click", function (event) {
      event.preventDefault();
      goHome();
    });
  }

  document.querySelectorAll("[data-mission]").forEach(function (card) {
    card.addEventListener("click", function () {
      openMission(Number(card.getAttribute("data-mission")));
    });
  });

  updateHome();
  showScreen("homeScreen");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupGame);
} else {
  setupGame();
    }
