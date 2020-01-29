let countdown;
const timerDisplay = document.querySelector('.display-time-left');
const buttons = document.querySelectorAll('.button');
const endTime = document.querySelector('.display-end-time');
const getBack = document.querySelector('.getBack');
const arrows = document.querySelectorAll('img');
const input = document.querySelector('input');

function timer(seconds) {
    //clear any existing timers
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);
    getBack.style.opacity = '1';
    getBack.style.transform = 'scale(1)';
    timerDisplay.style.color = 'white';

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if(secondsLeft < 0){
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000)
}

function displayTimeLeft(seconds) {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds - hours*3600) / 60);
    const remainderSeconds = seconds%60;
    let display;
    hours >= 1 ? (display = `${hours}:${minutes >= 10 ? minutes : `0${minutes}`}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`)
    : 
    minutes >=1 ? (display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`) : (display = `${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`);
    ;
    timerDisplay.innerHTML = display;
    if(hours === 0 && minutes === 0 && remainderSeconds < 25) timerDisplay.style.color = 'red';
    document.title = display;
    if(display == 00){
        timerDisplay.innerHTML = `TIME'S UP`
        endTime.textContent = 'GET TO WORK YOU LAZY BASTARD'
    }
    // if(hours >= 1){
    //     timerDisplay.style.fontSize = '80px';
    // }
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back At ${hour}:${minutes < 10 ? '0' : ''}${minutes}`
}

function startTimer() {
    timer(this.dataset.time);
    buttons.forEach(button => button.classList.remove('active'));
    this.classList.add('active');
}

buttons.forEach(button => button.addEventListener('click', startTimer))

document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = parseInt(this.minutes.value);
    if(typeof mins == 'number'){
    timer(mins*60);
    this.reset()};
})

function stopTimer(){
    buttons.forEach(button => button.classList.remove('active'));
    clearInterval(countdown);
    timerDisplay.textContent = '00:00'
    endTime.textContent = 'This Is The Working Hour'
    getBack.style.opacity = '0';
    getBack.style.transform = 'scale(0.5)'
    document.title = 'Countdown Clock';
    timerDisplay.style.color = 'white';
}

getBack.addEventListener('click',stopTimer)

function count(){
    const operator = this.dataset.count;
    if(input.value === '' && operator === '1') input.value = 1;
    else if(input.value === '' && operator === '-1') input.value = 0;
    else if(input.value !== '' && operator === '1') input.value = parseInt(input.value) + 1;
    else if(parseInt(input.value) > 0 && operator === '-1') input.value = parseInt(input.value) - 1;
}

arrows.forEach(arrow => arrow.addEventListener('click', count))