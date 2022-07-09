import Board from "../domain/Board";
import Card from "../domain/Card";
import { http } from "../infra/HttpServer";

export default class BoardsController {
    @http.route({method: "get", path: "/boards"})
    getBoards() {
        return [new Board("TODO", "Grocerie list")];
    }

    @http.route({method: "get", path: "/boards/:id"})
    getBoard(req: any) {
        console.log(`board:${req.id}`);
        return new Board("TODO", "Grocerie list");
    }

    @http.route({method: "get", path: "/boards/:boardId/columns"})
    getColumns(req: any) {
        console.log(`board:${req.boardId}`);
        return new Board("TODO", "Grocerie list").getColumns();
    }

    @http.route({method: "get", path: "/boards/:boardId/columns/:columnId/cards"})
    getCards(req: any) {
        console.log(`board:${req.boardId}`);
        console.log(`column:${req.columnId}`);
        return [new Card("title", 80)];
    }
}