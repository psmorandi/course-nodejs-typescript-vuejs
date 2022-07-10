import BoardRepository from "../repository/BoardRepository";
import GetCardsOutputData from "./data/GetCardsOutputData";

export default class GetCards {
    constructor(private boardRepository: BoardRepository) {}

    execute(boardId: string, columnId: string): GetCardsOutputData[] {
        const board = this.boardRepository.getBoard(boardId);
        if (!board) return [];
        const column = board.getColumn(columnId);
        if (!column) return [];
        return column.getCards().map((card) => new GetCardsOutputData(card.id, card.title, card.effort));
    }
}
