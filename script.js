// =============================================
// SHADOW MISSION - OFFLINE PUZZLE GAME
// =============================================
"use strict";

const missions = [
  {
    id: 1,
    title: "Crack the Code",
    description: "Find the missing number in this sequence.",
    question: "2, 4, 8, 14, ?",
    answer: "22",
    hint: "The differences are +2, +4, +6. What comes next?",
    points: 100
  },
  {
    id: 2,
    title: "Find the Clue",
    description: "Discover the hidden word.",
    question:
      "S — Search carefully<br>" +
      "H — Hidden clues matter<br>" +
      "A — Analyze the pattern<br>" +
      "D — Decode the message<br>" +
      "O — Observe everything<br>" +
      "W — Win the mission<br><br>" +
      "Enter the word formed by the first letters.",
    answer: "SHADOW",
    hint: "Read the first letter of each line.",
    points: 150
  },
  {
    id: 3,
    title: "Escape Room",
    description: "Solve the final riddle to escape.",
    question:
      "I have keys but no locks. I have space but no room. " +
      "You can enter, but you cannot go outside. What am I?",
    answer: "KEYBOARD",
    hint: "You use it to type on a computer.",
    points: 200
  }
];

const STORAGE_SCORE = "shadowMissionScore_v1";
const STORAGE_COMPLETED = "shadowMissionCompleted_v1";

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

  currentMission = mission;
  answerLocked = completedMissions.includes(mission.id);

  $("missionNumber").textContent = "MISSION " + String(mission.id).padStart(2, "0");
  $("missionTitle").textContent = mission.title;
  $("missionDescription").textContent = mission.description;
  $("gameContent").innerHTML = mission.question;
  $("answerInput").value = "";
  $("answerInput").disabled = answerLocked;

  const submit = $("answerForm").querySelector('button[type="submit"]');
  if (submit) submit.disabled = answerLocked;

  if (answerLocked) {
    setFeedback("Mission already completed. You can revisit it, Agent.", "success");
  } else {
    const feedback = $("feedback");
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
  completedMissions.push(currentMission.id);
  totalScore += currentMission.points;
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
