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

dateSelector.addEventListener('click', onDateSelect);
startBtn.addEventListener('click', countdown);
startBtn.disabled = true;

let userSelectedDate;
const options = {
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
        // iconUrl: '../img/lnr-cross-circle.svg',
        backgroundColor: 'red',
        closeOnClick: true,
        close: false,
        message: 'Ⓧ	Please choose a date in the future',
      });
      startBtn.disabled = true;
    } else {
      userSelectedDate = selectedDates[0];
      startBtn.disabled = false;
    }
  },
};

let countdownIntervalId;

function countdown() {
  countdownIntervalId = setInterval(() => {
    const timer = userSelectedDate - Date.now();
    const timerStart = convertMs(timer);

    showTimer(timerStart);
    startBtn.disabled = true;
    dateSelector.disabled = true;
    if (timer < 1000) {
      stopCountdown();
    }
  }, 1000);
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

function onDateSelect() {
  let calendar = flatpickr('#datetime-picker', options);
  calendar.open();
}

function showTimer(timerStart) {
  daySelected.textContent = timerStart.days.toString().padStart(2, '0');
  hourSelected.textContent = timerStart.hours.toString().padStart(2, '0');
  minuteSelected.textContent = timerStart.minutes.toString().padStart(2, '0');
  secondSelected.textContent = timerStart.seconds.toString().padStart(2, '0');
}
