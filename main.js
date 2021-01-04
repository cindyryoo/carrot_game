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
const popUpMsg = document.querySelector('.pop-up__msg');
const refreshBtn = document.querySelector('.refresh__button');

const field = document.querySelector('.game__field');
const fieldRecht = field.getBoundingClientRect();


const carrotSound = new Audio('sound/carrot_pull.mp3');
const bugSound = new Audio('sound/bug_pull.mp3');
const bgSound = new Audio('sound/bg.mp3');
const winSound = new Audio('sound/game_win.mp3');
const alertSound = new Audio('sound/alert.wav');


field.addEventListener('click',onFieldClick);
gameBtn.addEventListener('click', () => {
    if(isPlaying) {
        stopGame();
    }else {
        startGame();
    }
});

refreshBtn.addEventListener('click', () => {
    startGame();
    hidePopup();
})

function startGame() {
    isPlaying = true;
    initGame();
    showStopBtn();
    showTimerAndScore();
    startGameTimer();
    playSound(bgSound);
}
function stopGame() {
    isPlaying = false;
    stopGameTimer();
    hideGameButton();
    showPopUp('REPLAY?');
    playSound(alertSound);
    stopSound(bgSound);
}

function finishGame(win) {
    isPlaying = false;
    hideGameButton();
    if(win) {
        playSound(winSound);
    }else {
        playSound(bugSound);
    }
    showPopUp(win? 'YOU WON 🎉' : 'YOU LOST 👎🏻 ');
    stopSound(bgSound);
}

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
            finishGame(CARROT_COUNT === score);
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

function stopGameTimer(){
    clearInterval(timer);
}


function showStopBtn(){
    const icon = gameBtn.querySelector('.fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
}

function hideGameButton() {
    gameBtn.style.visibility = 'hidden';
}

function hidePopup() {
    popUp.classList.add('pop-up-hide');
}

function showPopUp(text) {
    popUpMsg.innerText = text;
    popUp.classList.remove('pop-up-hide');
}

function initGame(src , width, height , alt) {
    field.innerHTML = '';
    gameScore.innerText = CARROT_COUNT;
    addItem('carrot', CARROT_COUNT , 'img/carrot.png');
    addItem('bug', BUG_COUNT , 'img/bug.png');

}

function playSound(sound){
    sound.currentTime = 0;
    sound.play();
} 

function stopSound(sound) {
    sound.pause();
}

function onFieldClick(event) {

    if(!isPlaying) {
        return;
    }
    const target = event.target;
    if(target.matches('.carrot')) {
        target.remove();
        score++;
        playSound(carrotSound);
        updateScoreBoard();
        if(score === CARROT_COUNT) {
            finishGame(true);
        }
    }else if(target.matches('.bug')){
        stopGameTimer();
        finishGame(false);
    }
}

function updateScoreBoard() {
    gameScore.innerText = CARROT_COUNT - score;
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

