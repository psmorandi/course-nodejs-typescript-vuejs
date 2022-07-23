import Board from "../entity/Board";

export default interface BoardRepository {
    findAll(): Promise<Board[]>;
    get(boardId: number): Promise<Board>;
    save(board: Board): Promise<number>;
    update(board: Board): Promise<void>;
}
