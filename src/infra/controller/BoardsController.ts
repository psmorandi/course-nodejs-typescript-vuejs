import BoardService from "../../service/BoardService";
import CardService from "../../service/CardService";
import ColumnService from "../../service/ColumnService";
import Connection from "../database/Connection";
import Http from "../http/Http";
import BoardRepositoryMemory from "../repository/memory/BoardRepositoryMemory";
import CardRepositoryMemory from "../repository/memory/CardRepositoryMemory";
import ColumnRepositoryMemory from "../repository/memory/ColumnRepositoryMemory";
export default class BoardsController {
    constructor(readonly http: Http, readonly connection: Connection) {
        http.route("get", "/boards", async function (params: any, body: any) {
            const boardRepository = new BoardRepositoryMemory();
            const boardService = new BoardService(boardRepository);
            return boardService.getBoards();
        });

        http.route("get", "/boards/:boardId/columns", async function (params: any, body: any) {
            const columnRepository = new ColumnRepositoryMemory();
            const columnService = new ColumnService(columnRepository);
            return columnService.getColumns(params.boardId);
        });

        http.route("get", "/boards/:boardId/columns/:columnId/cards", async function (params: any, body: any) {
            const cardRepository = new CardRepositoryMemory();
            const cardService = new CardService(cardRepository);
            return cardService.getCards(params.columnId);
        });
    }
}
