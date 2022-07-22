import Board from "../domain/entity/Board";
import RepositoryAbstractFactory from "../domain/factory/RepositoryAbstractFactory";
import BoardRepository from "../domain/repository/BoardRepository";
import CardRepository from "../domain/repository/CardRepository";
import ColumnRepository from "../domain/repository/ColumnRepository";

export default class BoardService {
    private boardRepository: BoardRepository;
    private columnRepository: ColumnRepository;
    private cardRepository: CardRepository;

    constructor(repositoryFactory: RepositoryAbstractFactory) {
        this.boardRepository = repositoryFactory.createBoardRepository();
        this.columnRepository = repositoryFactory.createColumnRepository();
        this.cardRepository = repositoryFactory.createCardRepository();
    }

    async getBoards(): Promise<Board[]> {
        const boards = await this.boardRepository.findAll();
        return boards;
    }

    async getBoard(boardId: number): Promise<GetBoardOutput> {
        const board = await this.boardRepository.get(boardId);
        const output: GetBoardOutput = {
            name: board.name,
            estimative: 0,
            columns: [],
        };

        const columns = await this.columnRepository.findAllBy(boardId);
        for (const column of columns) {
            const columnOutput: ColumnOutput = {
                name: column.name,
                estimative: 0,
                hasEstimative: column.hasEstimative,
                cards: [],
            };
            const cards = await this.cardRepository.findAllBy(column.id);
            for (const card of cards) {
                if (column.hasEstimative) {
                    columnOutput.estimative += card.estimative;
                    output.estimative += card.estimative;
                }
                columnOutput.cards.push({ title: card.title, estimative: card.estimative });
            }
            output.columns.push(columnOutput);
        }
        return output;
    }

    async saveBoard(input: SaveBoardInput): Promise<number> {
        const board = new Board(input.name, input.description);
        const boardId = await this.boardRepository.save(board);
        return boardId;
    }
}

type SaveBoardInput = {
    name: string;
    description: string;
};

type ColumnOutput = {
    name: string;
    estimative: number;
    hasEstimative: boolean;
    cards: { title: string; estimative: number }[];
};

type GetBoardOutput = {
    name: string;
    estimative: number;
    columns: ColumnOutput[];
};
