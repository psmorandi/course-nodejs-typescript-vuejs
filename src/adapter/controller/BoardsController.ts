import BoardRepository from "../../domain/repository/BoardRepository";
import GetBoards from "../../domain/usecase/GetBoards";
import GetCards from "../../domain/usecase/GetCards";
import GetColumns from "../../domain/usecase/GetColumns";
import { http } from "../../infra/HttpServer";
export default class BoardsController {
    constructor(private boardRepository: BoardRepository) {}

    @http.route({ method: "get", path: "/boards" })
    getBoards() {
        const getBoards = new GetBoards(this.boardRepository);
        return getBoards.execute();
    }

    @http.route({ method: "get", path: "/boards/:boardId/columns" })
    getColumns(req: any) {
        const getColumns = new GetColumns(this.boardRepository);
        return getColumns.execute(req.boardId);
    }

    @http.route({ method: "get", path: "/boards/:boardId/columns/:columnId/cards" })
    getCards(req: any) {
        const getCards = new GetCards(this.boardRepository);
        return getCards.execute(req.boardId, req.columnId);
    }
}
