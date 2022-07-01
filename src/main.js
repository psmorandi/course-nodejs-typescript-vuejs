import Board from "./Board.js";

const board = new Board("name", "description");
    board.addColumn("TODO", true);
    board.addColumn("DOING", true);
    board.addColumn("DONE", false);
    board.addCard("TODO", "Task 1", 4);

console.log(board);