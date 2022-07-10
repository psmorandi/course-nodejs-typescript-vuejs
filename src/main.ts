import BoardsController from "./adapter/controller/BoardsController";
import Board from "./domain/entity/Board";
import Card from "./domain/entity/Card";

const board = new Board("TODO", "todo items");
board.addColumn("DOING", true);
board.getColumn("DOING")?.attach(new Card("card", 60));

console.log(board);

new BoardsController();
