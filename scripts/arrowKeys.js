export let direction = -1;
export let horizontalMoving;
export let SNAKE_SPEED = 4;

document.onkeydown = function (e) {
    switch (e.key) {
        case "ArrowLeft":
            if (!horizontalMoving) {
                horizontalMoving = true;
                direction = -1;
            }
            break;
        case "ArrowUp":
            if (horizontalMoving) {
                direction = -1;
                horizontalMoving = false;
            }
            break;
        case "ArrowRight":
            if (!horizontalMoving) {
                horizontalMoving = true;
                direction = +1;
            }
            break;
        case "ArrowDown":
            if (horizontalMoving) {
                horizontalMoving = false;
                direction = +1;
            }
            break;
        case "=":
            SNAKE_SPEED += 0.2;
            break;
        case "-":
            SNAKE_SPEED -= 0.2;
    }
};
