import { BOARD_HEIGHT, BOARD_WIDTH } from "./board.js";
import { direction, horizontalMoving } from "./arrowKeys.js";
import { checkForLose, spawnFood } from "./main.js";

export let gameLost = false;
export let snake = [
    {
        x: Math.floor(BOARD_WIDTH / 2),
        y: BOARD_HEIGHT / 2,
    },
];
export function resetSnake() {
    const snakeSegments = document.querySelectorAll(".snake");
    snakeSegments.forEach((segment) => {
        segment.classList.remove("snake");
    });
    snake = [
        {
            x: Math.floor(BOARD_WIDTH / 2),
            y: BOARD_HEIGHT / 2,
        },
    ];
}
export function eatFood() {
    const food = document.querySelector(".food");
    if (food.classList.contains("snake")) {
        food.classList.remove("food");
        spawnFood();
        grow();
        return true;
    }
}
function grow() {
    let newTail = {
        x: snake[0].x - 1,
        y: snake[0].y,
    };
    if (snake.length > 1) {
        if (snake[snake.length - 1].y == snake[snake.length - 2].y) {
            if (snake[snake.length - 1].x < snake[snake.length - 2].x) {
                newTail.x = snake[snake.length - 1].x - 1;
                newTail.y = snake[snake.length - 1].y;
            } else {
                newTail.x = snake[snake.length - 1].x + 1;
                newTail.y = snake[snake.length - 1].y;
            }
        }
        if (snake[snake.length - 1].x == snake[snake.length - 2].x) {
            if (snake[snake.length - 1].y < snake[snake.length - 2].y) {
                newTail.x = snake[snake.length - 1].x;
                newTail.y = snake[snake.length - 1].y - 1;
            } else {
                newTail.x = snake[snake.length - 1].x;
                newTail.y = snake[snake.length - 1].y + 1;
            }
        }
    }
    snake.push(newTail);
}

export function slither() {
    const tailEnd = document.querySelector(`[data-x=x${snake[snake.length - 1].x}][data-y=y${snake[snake.length - 1].y}]`);
    for (let i = snake.length; i - 2 >= 0; i--) {
        snake[i - 1].x = snake[i - 2].x;
        snake[i - 1].y = snake[i - 2].y;
    }
    if (horizontalMoving) {
        snake[0].x += direction;
    } else {
        snake[0].y += direction;
    }
    if (checkForLose()) return;
    const nextPosition = document.querySelector(`[data-x=x${snake[0].x}][data-y=y${snake[0].y}]`);
    if (nextPosition.classList.contains("snake")) {
        gameLost = true;
    }
    nextPosition.classList.add("snake");
    tailEnd.classList.remove("snake");
}
