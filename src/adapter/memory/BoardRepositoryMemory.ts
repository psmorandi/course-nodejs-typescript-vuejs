import Board from "../../domain/entity/Board";
import BoardRepository from "../../domain/repository/BoardRepository";

export default class BoardRepositoryMemory implements BoardRepository {
    private boards: Board[];

    constructor() {
        this.boards = [];
    }

    getBoard(id: string): Board | undefined {
        return this.boards.find((board) => board.id === id);
    }

    save(board: Board): string {
        this.boards.push(board);
        return board.id;
    }

    getAll(): Board[] {
        return this.boards;
    }
}
