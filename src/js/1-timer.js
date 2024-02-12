import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dateSelector = document.querySelector('input');
const startBtn = document.querySelector('button');
const daySelected = document.querySelector('.value[data-days]');
const hourSelected = document.querySelector('.value[data-hours]');
const minuteSelected = document.querySelector('.value[data-minutes]');
const secondSelected = document.querySelector('.value[data-seconds]');

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

let userSelectedDate;

let countdownIntervalId;

function countdown() {
  countdownIntervalId = setInterval(() => {
    const timer = userSelectedDate - Date.now();
    const timerStart = convertMs(timer);
    showTimer(timerStart);
    if (timer < 1000) {
      stopCountdown();
    }
  }, 1000);
  startBtn.disabled = true;
  dateSelector.disabled = true;
  iziToast.show({
    position: 'topRight',
    messageColor: 'white',
    progressBar: true,
    backgroundColor: '#1c47ab',
    timeout: 5000,
    closeOnClick: true,
    close: false,
    message: '❕	Please right click to reset the timer',
  });
}

function stopCountdown() {
  clearInterval(countdownIntervalId);
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
  daySelected.textContent = timerStart.days.toString().padStart(2, '0');
  hourSelected.textContent = timerStart.hours.toString().padStart(2, '0');
  minuteSelected.textContent = timerStart.minutes.toString().padStart(2, '0');
  secondSelected.textContent = timerStart.seconds.toString().padStart(2, '0');
}

document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  resetTimer();
});

function resetTimer() {
  clearInterval(countdownIntervalId);
  daySelected.textContent = '00';
  hourSelected.textContent = '00';
  minuteSelected.textContent = '00';
  secondSelected.textContent = '00';
  startBtn.disabled = false;
  dateSelector.disabled = false;
}
