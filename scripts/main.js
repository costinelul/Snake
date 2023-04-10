import { BOARD_HEIGHT, BOARD_WIDTH } from "./board.js";
import { slither, eatFood, snake, gameLost, resetSnake } from "./snake.js";
const gameInfo = document.querySelector(".game-info");
import { SNAKE_SPEED } from "./arrowKeys.js";
let currentScore = 0;
let highestScore = 0;
let lastTime = 0;
document.addEventListener("keydown", startGame, { once: true });

function startGame() {
    gameInfo.style.display = "none";
    spawnFood();
    spawnSnake();
    window.requestAnimationFrame(updateBoard);
}

function spawnSnake() {
    const spawnSnake = document.querySelector(`[data-x=x${snake[0].x}][data-y=y${snake[0].y}]`);
    spawnSnake.classList.add("snake");
}

export function spawnFood() {
    let x, y;
    do {
        x = Math.floor(Math.random() * BOARD_WIDTH);
        y = Math.floor(Math.random() * BOARD_HEIGHT);
    } while (document.querySelector(`[data-x=x${x}][data-y=y${y}]`).classList.contains("snake"));
    document.querySelector(`[data-x=x${x}][data-y=y${y}]`).classList.add("food");
}

function updateBoard(currentTime) {
    if (checkForLose()) {
        gameOver();
        return;
    }
    requestAnimationFrame(updateBoard);
    const timePassed = currentTime - lastTime;
    if (timePassed >= 500 / SNAKE_SPEED) {
        slither();
        if (eatFood()) updateScore();
        lastTime = currentTime;
    }
}

function gameOver() {
    gameInfo.innerHTML = "Game Over!";
    const playAgain = document.createElement("button");
    playAgain.innerHTML = "Play Again";
    gameInfo.appendChild(playAgain);
    gameInfo.style.display = "block";
    playAgain.addEventListener("click", restartGame, { once: true });
}
function restartGame() {
    resetSnake();
    if (currentScore > highestScore) {
        highestScore = currentScore;
        document.querySelector(".highest-score").innerHTML = `Highest Score: ${currentScore}`;
    }
    currentScore = 0;
    document.querySelector(".current-score").innerHTML = `Current score: 0`;
    const food = document.querySelector(".food");
    food.classList.remove("food");
    startGame();
}

export function updateScore() {
    currentScore += 5;
    document.querySelector(".current-score").innerHTML = `Current Score: ${currentScore}`;
}
export function checkForLose() {
    if (snake[0].x < 0 || snake[0].x == BOARD_WIDTH || snake[0].y < 0 || snake[0].y == BOARD_HEIGHT) return true;
    if (gameLost) return true;
}
