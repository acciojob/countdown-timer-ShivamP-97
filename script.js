// Your script here.
const input = document.getElementById('userInput');
const startButton = document.querySelector('button');
const countDownDisplay = document.getElementById('countDown');
const endTimeDisplay = document.getElementById('endTime');

let countdown; 

function startTimer(minutes) {
  clearInterval(countdown); 

  const now = Date.now();
  const endTime = now + minutes * 60 * 1000;

  displayTimeLeft(minutes * 60);
  displayEndTime(endTime);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((endTime - Date.now()) / 1000);

    if (secondsLeft <= 0) {
      clearInterval(countdown);
      countDownDisplay.textContent = "Time's up!";
      return;
    }

    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  countDownDisplay.textContent = `Time Left: ${display}`;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  let hours = end.getHours();
  const minutes = end.getMinutes();
  const adjustedHours = hours > 12 ? hours - 12 : hours;
  const ampm = hours >= 12 ? 'PM' : 'AM';
  endTimeDisplay.textContent = `End Time: ${adjustedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
}

startButton.addEventListener('click', () => {
  const mins = parseFloat(input.value);
  if (!isNaN(mins) && mins > 0) {
    startTimer(mins);
  }
});

input.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    const mins = parseFloat(input.value);
    if (!isNaN(mins) && mins > 0) {
      startTimer(mins);
    }
  }
});
