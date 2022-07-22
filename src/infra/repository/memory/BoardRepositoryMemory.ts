import Board from "../../../domain/entity/Board";
import BoardRepository from "../../../domain/repository/BoardRepository";

export default class BoardRepositoryMemory implements BoardRepository {
    private boards: Board[];

    constructor() {
        this.boards = [
            new Board("Project 1", "project 1"),
            new Board("Project 2", "project 2"),
            new Board("Project 3", "project 3"),
        ];
    }
    
    get(boardId: number): Promise<Board> {
        throw new Error("Method not implemented.");
    }

    findAll(): Promise<Board[]> {
        return Promise.resolve(this.boards);
    }
}
