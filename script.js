let startTime, updatedTime, difference, tInterval;
let running = false;
let laps = 1;

const display = document.querySelector(".display");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const lapsList = document.querySelector(".laps");

function startTimer() {
  if (!running) {
    startTime = new Date().getTime() - (difference || 0);
    tInterval = setInterval(updateTimer, 10);
    running = true;
  }
}

function pauseTimer() {
  if (running) {
    clearInterval(tInterval);
    difference = new Date().getTime() - startTime;
    running = false;
  }
}

function resetTimer() {
  clearInterval(tInterval);
  running = false;
  difference = 0;
  laps = 1;
  display.textContent = "00:00:00.00";
  lapsList.innerHTML = "";
}

function lapTimer() {
  if (running) {
    const li = document.createElement("li");
    li.textContent = `Lap ${laps++}: ${display.textContent}`;
    lapsList.appendChild(li);
  }
}

function updateTimer() {
  updatedTime = new Date().getTime() - startTime;
  const hours = Math.floor((updatedTime / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((updatedTime / (1000 * 60)) % 60);
  const seconds = Math.floor((updatedTime / 1000) % 60);
  const milliseconds = Math.floor((updatedTime % 1000) / 10);

  display.textContent = 
    `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 2)}`;
}

function pad(unit, digits = 2) {
  return String(unit).padStart(digits, "0");
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", lapTimer);
