import Board from "../../domain/Board";
import BoardRepository from "../../domain/repository/BoardRepository";

export default class BoardRepositoryMemory implements BoardRepository {
    private boards: Board[];

    constructor() {
        this.boards = [];
    }

    save(board: Board): string {
        this.boards.push(board);
        return board.id;
    }

    getAll(): Board[] {
        return this.boards;
    }
}
