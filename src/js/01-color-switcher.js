
const  startBtn = document.querySelector('[data-start]')
const  stopBtn = document.querySelector('[data-stop]')

let timerId = null;


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
startBtn.addEventListener('click', (e) => {
    
    if (timerId !== true && e.target.click) {
        startBtn.disabled = true;
        stopBtn.disabled = false;
        timerId = setInterval(() => {
            document.body.style.backgroundColor = getRandomHexColor();
        }, 1000);   
    } 
  }
);
stopBtn.addEventListener("click", (e) => {
    
    if (e.target.click && timerId) {
        clearInterval(timerId)
        startBtn.disabled = false;
       stopBtn.disabled = true;
    } else {
        stopBtn.disabled = false;
    }
 
});
