import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'

 const inputData = document.querySelector('#datetime-picker')
 const startBtn = document.querySelector('[data-start]')
 const dataDays = document.querySelector('[data-days]') 
 const dataHours = document.querySelector('[data-hours]') 
 const dataMinutes = document.querySelector('[data-minutes]')
 const dataSeconds = document.querySelector('[data-seconds]') 

startBtn.disabled = true;
let date = 0
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    date = selectedDates[0].getTime();
    if (date <= new Date() ) {
       startBtn.disabled = true;
      alert('Please choose a date in the future');
      return;
    }
    startBtn.disabled = false;
  },
};

 flatpickr(inputData, options);

startBtn.addEventListener('click', (e) => {
     e.target.click = setInterval(() => {
      startBtn.disabled = true;
      const currentTime = new Date();
      const ms = date - currentTime;
      const { days, hours, minutes, seconds } = convertMs(ms)
      updateTimeValue({ days, hours, minutes, seconds })
      if (convertMs(ms).days && convertMs(ms).hours && convertMs(ms).minutes && convertMs(ms).seconds === '00') {
        clearInterval(e.target.click)
      } 
    }, 1000) 
  } 
);

function addLeadingZero(value) {
  return String(value).padStart(2, '0')
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days =  addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours =  addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes =  addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds =  addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

//console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
//console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function updateTimeValue({ days, hours, minutes, seconds }) {
 dataDays.textContent = `${days}`
 dataHours.textContent = `${hours}`
 dataMinutes.textContent = `${minutes}`
 dataSeconds.textContent = `${seconds}` 
}