import Board from "../../../domain/entity/Board";
import BoardRepository from "../../../domain/repository/BoardRepository";

export default class BoardRepositoryMemory implements BoardRepository {
    private boards: Board[];

    constructor() {
        this.boards = [];
    }
    
    findAll(): Promise<Board[]> {
        return Promise.resolve(this.boards);
    }
}
