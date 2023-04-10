export const BOARD_HEIGHT = 20;
export const BOARD_WIDTH = 25;
const board = document.querySelector(".board");
function createBoard() {
    for (let y = 0; y < BOARD_HEIGHT; y++) {
        const row = document.createElement("div");
        row.classList.add("row");
        board.appendChild(row);
        for (let x = 0; x < BOARD_WIDTH; x++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("data-x", "x" + x);
            cell.setAttribute("data-y", "y" + y);
            row.appendChild(cell);
        }
    }
}

createBoard();
