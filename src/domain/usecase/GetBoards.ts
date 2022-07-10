import BoardRepository from "../repository/BoardRepository";
import GetBoardsOutputData from "./data/GetBoardsOutputData";

export default class GetBoards {
    constructor(private boardRepository: BoardRepository) {}

    execute(): GetBoardsOutputData[] {
        return this.boardRepository
            .getAll()
            .map((board) => new GetBoardsOutputData(board.id, board.name, board.description));
    }
}
