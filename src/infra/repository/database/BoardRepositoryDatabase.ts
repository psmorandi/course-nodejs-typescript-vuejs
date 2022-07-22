import Board from "../../../domain/entity/Board";
import BoardRepository from "../../../domain/repository/BoardRepository";
import Connection from "../../database/Connection";

export default class BoardRepositoryDatabase implements BoardRepository {
    constructor(readonly connection: Connection) {}

    async get(boardId: number): Promise<Board> {
        const boardData = await this.connection.query("select * from nodejs.board where id_board = $1", [boardId]);
        if (!boardData || boardData.length !== 1) throw new Error("Board not found.");
        const board = new Board(boardData[0].name, boardData[0].description);
        return board;
    }

    async findAll(): Promise<Board[]> {
        const boardsData = await this.connection.query("select * from nodejs.board", []);
        const boards: Board[] = [];
        for (const boardData of boardsData) {
            const board = new Board(boardData.name, boardData.description);
            boards.push(board);
        }
        return boards;
    }
}
