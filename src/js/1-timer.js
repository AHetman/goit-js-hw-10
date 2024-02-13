import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dateSelector = document.querySelector('input');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const daysDisplay = document.querySelector('.value[data-days]');
const hoursDisplay = document.querySelector('.value[data-hours]');
const minutesDisplay = document.querySelector('.value[data-minutes]');
const secondsDisplay = document.querySelector('.value[data-seconds]');

let countdownTimerIntervalId;

const calendar = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      iziToast.show({
        position: 'topRight',
        messageColor: 'white',
        progressBar: false,
        backgroundColor: 'red',
        closeOnClick: true,
        close: false,
        message: '❌ Please choose a date in the future',
      });
      startBtn.disabled = true;
    } else {
      userSelectedDate = selectedDates[0];
      startBtn.disabled = false;
    }
  },
});

startBtn.addEventListener('click', countdown);
startBtn.disabled = true;
stopBtn.addEventListener('click', resetTimer);
stopBtn.disabled = true;

let userSelectedDate;

// let countdownIntervalId;

function countdown() {
  clearInterval(countdownTimerIntervalId);
  if (!userSelectedDate || userSelectedDate <= Date.now()) {
    iziToast.error({
      message: '❌ Please choose a date in the future',
      backgroundColor: 'red',
      messageColor: 'white',
      position: 'topRight',
      icon: null,
    });
    return;
  }

  countdownTimerIntervalId = setInterval(() => {
    const timer = userSelectedDate - Date.now();
    const timerStart = convertMs(timer);
    showTimer(timerStart);
    if (timer < 1000) {
      stopCountdown();
    }
  }, 1000);
  startBtn.disabled = true;
  dateSelector.disabled = true;
  stopBtn.disabled = false;
}

function stopCountdown() {
  clearInterval(countdownTimerIntervalId);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function showTimer(timerStart) {
  daysDisplay.textContent = timerStart.days.toString().padStart(2, '0');
  hoursDisplay.textContent = timerStart.hours.toString().padStart(2, '0');
  minutesDisplay.textContent = timerStart.minutes.toString().padStart(2, '0');
  secondsDisplay.textContent = timerStart.seconds.toString().padStart(2, '0');
}

function resetTimer() {
  clearInterval(countdownTimerIntervalId);
  daysDisplay.textContent = '00';
  hoursDisplay.textContent = '00';
  minutesDisplay.textContent = '00';
  secondsDisplay.textContent = '00';
  startBtn.disabled = false;
  dateSelector.disabled = false;
  stopBtn.disabled = true;
}
