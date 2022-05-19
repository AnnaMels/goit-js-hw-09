import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const refs = {
    startButton: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
};

refs.startButton.setAttribute('disabled', 'disabled');

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < new Date()) {
            Notiflix.Notify.failure("Please choose a date in the future")
        };

        if (selectedDates[0] > new Date()) {
            refs.startButton.removeAttribute('disabled');
        };

        refs.startButton.addEventListener('click', () => {
            setInterval(() => {
            const finishDate = selectedDates[0] - Date.now();
                if (finishDate <= 0) {
                    return;
                };
                const { days, hours, minutes, seconds } = convertMs(finishDate);
                refs.days.textContent = addLeadingZero(days);
                refs.hours.textContent = addLeadingZero(hours);
                refs.minutes.textContent = addLeadingZero(minutes);
                refs.seconds.textContent = addLeadingZero(seconds);
            }, 1000);
        });
    },
};

flatpickr("#datetime-picker", options);


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
};

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}