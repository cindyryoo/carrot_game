'use strict';

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;

const GAME_DURATION_SEC = 9;
let score = 0;
let isPlaying = false;
let timer = undefined;

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');
const popUp = document.querySelector('.pop-up');
const refreshBtn = document.querySelector('.refresh__button');
const field = document.querySelector('.game__field');
const fieldRecht = field.getBoundingClientRect();



gameBtn.addEventListener('click', () => {
    if(isPlaying) {
        stopGame();
    }else {
        startGame();
    }
    isPlaying = !isPlaying;
});

function startGame() {
    initGame();
    showStopBtn();
    showTimerAndScore();
    startGameTimer();
}
function stopGame() {}

function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function startGameTimer() {
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec);
    timer = setInterval(() => {
        if(remainingTimeSec <= 0) {
            clearInterval(timer);
            return;
        }
        updateTimerText(--remainingTimeSec);
    },1000);
    }

function updateTimerText(time) {
    // const minutes = Math.floor(time /60);
    // const seconds = time % 60;
    gameTimer.innerText = `0 : ${time}`;
}


function showStopBtn(){
    const icon = gameBtn.querySelector('.fa-play');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
}

function initGame(src , width, height , alt) {
    field.innerHTML = '';
    gameScore.innerText = CARROT_COUNT;
    addItem('carrot', CARROT_COUNT , 'img/carrot.png');
    addItem('bug', BUG_COUNT , 'img/bug.png');

}









function addItem(className, count , imgSrc) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRecht.width - CARROT_SIZE; 
    const y2 = fieldRecht.height - CARROT_SIZE; 
    for(let i = 0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class',className);
        item.setAttribute('src', imgSrc);
        item.style.position = 'absolute';
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

