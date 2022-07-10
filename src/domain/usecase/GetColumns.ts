import BoardRepository from "../repository/BoardRepository";
import GetColumnOutputData from "./data/GetColumnOutputData";

export default class GetColumns {
    constructor(private boardRepository: BoardRepository) {}

    execute(boardId: string): GetColumnOutputData[] {
        const board = this.boardRepository.getBoard(boardId);
        if (board) {
            return board.getColumns().map((col) => new GetColumnOutputData(col.id, col.name, col.shouldCountCardTime));
        }

        return [];
    }
}
