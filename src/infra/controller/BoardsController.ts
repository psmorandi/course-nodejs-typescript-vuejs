import BoardRepositoryMemory from "../../adapter/repository/memory/BoardRepositoryMemory";
import BoardRepository from "../../domain/repository/BoardRepository";
import GetBoards from "../../domain/usecase/GetBoards";
import GetCards from "../../domain/usecase/GetCards";
import GetColumns from "../../domain/usecase/GetColumns";
import Connection from "../database/Connection";
import Http from "../http/Http";
export default class BoardsController {
    constructor(readonly http: Http, readonly connection: Connection) {
        http.route("get", "/boards", async function (params: any, body: any) {
            const boardRepository = new BoardRepositoryMemory();
            const getBoards = new GetBoards(boardRepository);
            return getBoards.execute();
        });

        http.route("get", "/boards/:boardId/columns", async function (params: any, body: any) {
            const boardRepository = new BoardRepositoryMemory();
            const getColumns = new GetColumns(boardRepository);
            return getColumns.execute(params.boardId);
        });

        http.route("get", "/boards/:boardId/columns/:columnId/cards", async function (params: any, body: any) {
            const boardRepository = new BoardRepositoryMemory();
            const getCards = new GetCards(boardRepository);
            return getCards.execute(params.boardId, params.columnId);
        });
    }
}
