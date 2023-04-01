import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  btnStart: document.querySelector('button[data-start]'),
  daysTxt: document.querySelector('span[data-days]'),
  hoursTxt: document.querySelector('span[data-hours]'),
  minutesTxt: document.querySelector('span[data-minutes]'),
  secondsTxt: document.querySelector('span[data-seconds]'),
};

const { btnStart, daysTxt, hoursTxt, minutesTxt, secondsTxt } = refs;

btnStart.setAttribute('disabled', 'disabled')

let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() - Date.now() < 0) {
      Notiflix.Notify.warning('Please choose a date in the future', {
        rtl: true,
      });
    } else {
      btnStart.addEventListener('click', onBthStartClick);

      btnStart.removeAttribute('disabled', 'disabled')

      function onBthStartClick() {
        btnStart.setAttribute('disabled', 'disabled')

        let timeLeft = selectedDates[0].getTime() - Date.now();
        let { days, hours, minutes, seconds } = convertMs(timeLeft);

        daysTxt.textContent = addLeadingZero(String(days));
        hoursTxt.textContent = addLeadingZero(String(hours));
        minutesTxt.textContent = addLeadingZero(String(minutes));
        secondsTxt.textContent = addLeadingZero(String(seconds));

        intervalId = setInterval(() => {
          timeLeft = selectedDates[0].getTime() - Date.now();
          let { days, hours, minutes, seconds } = convertMs(timeLeft);

          daysTxt.textContent = addLeadingZero(String(days));
          hoursTxt.textContent = addLeadingZero(String(hours));
          minutesTxt.textContent = addLeadingZero(String(minutes));
          secondsTxt.textContent = addLeadingZero(String(seconds));
          console.log(selectedDates[0].getTime() - Date.now());
          if ((selectedDates[0].getTime() - Date.now()) < 0) {
            clearInterval(intervalId);

            btnStart.removeAttribute('disabled', 'disabled')
          }
        }, 1000);
      }
    }
  },
};

flatpickr('input#datetime-picker', options);

function addLeadingZero(value) {
  return value.padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}