import Board from "../entities/Board";
import HttpClient from "../infra/http/HttpClient";
import BoardService, { AddColumnInput } from "./BoardService";

export default class BoardServiceHttp implements BoardService {
  constructor(readonly httpClient: HttpClient, readonly baseUrl: string) {}

  async getBoard(boardId: number): Promise<Board> {
    const boardData = await this.httpClient.get(
      `${this.baseUrl}/boards/${boardId}`
    );
    const board = new Board(boardData.id, boardData.name);
    for (const columnData of boardData.columns) {
      board.addColumn(columnData.name, columnData.estimative);
      for (const cardData of columnData.cards) {
        board.addCard(columnData.name, cardData.title, cardData.estimative);
      }
    }

    return board;
  }

  async addColumn(column: AddColumnInput): Promise<number> {
    const columnId = await this.httpClient.post(
      `${this.baseUrl}/boards/${column.boardId}/columns`,
      column
    );
    return columnId;
  }
}
