import Board from "../entities/Board";

export default interface BoardService {
  getBoard(boardId: number): Promise<Board>;
  addColumn(column: AddColumnInput): Promise<number>;
}

export type AddColumnInput = {
  boardId: number;
  column: {
    name: string;
    hasEstimative: boolean;
  };
};
