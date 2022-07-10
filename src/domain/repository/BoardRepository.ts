import Board from "../Board";

export default interface BoardRepository {
  save(board: Board): string;
  getAll(): Board[];
}
