import RepositoryAbstractFactory from "../../domain/factory/RepositoryAbstractFactory";
import BoardService from "../../service/BoardService";
import CardService from "../../service/CardService";
import ColumnService from "../../service/ColumnService";
import Http from "../http/Http";
export default class BoardsController {
    constructor(readonly http: Http, readonly repositoryFactory: RepositoryAbstractFactory) {
        http.route("get", "/boards", async function (_params: any, _body: any) {
            const boardService = new BoardService(repositoryFactory);
            return await boardService.getBoards();
        });

        http.route("get", "/boards/:boardId", async function (params: any, _body: any) {
            const boardService = new BoardService(repositoryFactory);
            return await boardService.getBoard(parseInt(params.boardId));
        });

        http.route("get", "/boards/:boardId/columns", async function (params: any, _body: any) {
            const columnService = new ColumnService(repositoryFactory);
            return await columnService.getColumns(parseInt(params.boardId));
        });

        http.route("post", "/boards/:boardId/columns", async function (_params: any, body: any) {
            const boardService = new BoardService(repositoryFactory);            
            return await boardService.addColumn(body);
        });

        http.route("get", "/boards/:boardId/columns/:columnId/cards", async function (params: any, _body: any) {
            const cardService = new CardService(repositoryFactory.createCardRepository());
            return await cardService.getCards(parseInt(params.columnId));
        });
    }
}
