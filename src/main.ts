import BoardsController from "./application/BoardsController";
import Board from "./domain/Board";
import Card from "./domain/Card";

const board = new Board("TODO", "todo items");
board.addColumn("DOING", true);
board.getColumn("DOING")?.attach(new Card("card", 60));

console.log(board);

new BoardsController();
