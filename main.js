'use strict';

const gameBtn = document.querySelector('.game__button');
const timer = document.querySelector('.game__timer');
const score = document.querySelector('.game__score');
const popUp = document.querySelector('.pop-up');
const refreshBtn = document.querySelector('.refresh__button');
const field = document.querySelector('.game__field');
const fieldRecht = field.getBoundingClientRect();
const CARROT_SIZE = 80;

function initGame(src , width, height , alt) {
    addItem('carrot', 5 , 'img/carrot.png');
    addItem('bug', 5 , 'img/bug.png');
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

initGame();

