import BoardsController from "./adapter/controller/BoardsController";
import BoardRepositoryMemory from "./adapter/repository/memory/BoardRepositoryMemory";
import Board from "./domain/entity/Board";
import Card from "./domain/entity/Card";
import { http } from "./infra/HttpServer";

const board = new Board("TODO", "todo items");
board.addColumn("DOING", true);
board.getColumn("DOING")?.attach(new Card("card", 60));

console.log(board);

new BoardsController(new BoardRepositoryMemory());

http.listen(3000);
