
'use strict';

const gameBtn = document.querySelector('.game__button');
const refreshBtn = document.querySelector('.refresh__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');
const field = document.querySelector('.game__field');
const popUp = document.querySelector('.pop-up');
const popUpMsg = document.querySelector('.pop-up__msg')
const fieldRect = field.getBoundingClientRect();

const CARROT_SIZE = 80;
const CARROT_COUNT = 10;
const BUG_COUNT = 10;
const GAME_DURATION_SEC = 9;
let isPlaying = false;
let timer = undefined;
let score = 0;


const carrotSound = new Audio('sound/carrot_pull.mp3');
const bugSound = new Audio('sound/bug_pull.mp3');
const bgSound = new Audio('sound/bg.mp3');
const winSound = new Audio('sound/game_win.mp3');
const alertSound = new Audio('sound/alert.wav');

field.addEventListener('click', fieldOnClick);

refreshBtn.addEventListener('click', () => {
    startGame();
    hidePopup();

})

gameBtn.addEventListener('click', () => {
    if(isPlaying) {
        stopGame();
    }else{
        startGame();
    }
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
    showPopup('REPLAY?');
    hideGameBtn();
    stopSound(bgSound);
    playSound(alertSound);
}

function finishGame(win) {
    isPlaying = false;
    stopGameTimer();
    if(win) {
        playSound(winSound);
    }else {
        playSound(bugSound);
    }
    showPopup(win? 'YOU WON! 🎉': 'YOU LOST! 👎🏻');
    stopSound(bgSound);
}

function showStopBtn() {
    const icon = document.querySelector('.fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    gameBtn.style.visibility = 'visible';
}

function hideGameBtn() {
    gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function startGameTimer(){
    let count = GAME_DURATION_SEC;
    updateTimerText(count);
    timer = setInterval(() => {
        if(count <= 0){
            clearInterval(timer);
            finishGame(CARROT_COUNT === score);
            return;
        }
        updateTimerText(--count);
        
    },1000)
}

function stopGameTimer() {
    clearInterval(timer);
}


function updateTimerText(time){
    gameTimer.innerText = `0 : ${time}`;
}


function showPopup(text) {
    popUpMsg.innerText = text;
    popUp.classList.remove('pop-up-hide');
}

function hidePopup() {
    popUp.classList.add('pop-up-hide');
}

function fieldOnClick(event) {
    if(!isPlaying) return;
    const target = event.target;
    if(target.matches('.carrot')) {
        target.remove();
        score++;
        updateScoreText();
        if(score === CARROT_COUNT) {
            finishGame(true);
        }
    }else if(target.matches('.bug')) {
        finishGame(false);
    }
}

function updateScoreText() {
    gameScore.innerText = CARROT_COUNT-score;
}


function initGame(src, width, height, alt) {
    field.innerHTML = "";
    score = 0;
    gameScore.innerText = CARROT_COUNT;
    addItem('carrot', CARROT_COUNT, 'img/carrot.png');
    addItem('bug', BUG_COUNT, 'img/bug.png');
}



function addItem(className, count , imgSrc) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;

    for(let i = 0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgSrc);
        item.style.position = 'absolute';

        const x = randomNumber(x1 , x2);
        const y = randomNumber(y1 , y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);
    }

}



function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound) {
    sound.pause();
}
