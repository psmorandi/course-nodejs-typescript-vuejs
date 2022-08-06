import Board from "../domain/entity/Board";
import Column from "../domain/entity/Column";
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

    async getBoards(): Promise<GetBoardsOutput[]> {
        const boards = await this.boardRepository.findAll();
        return boards.map((board) => {
            const boarMapped: GetBoardsOutput = { id: board.id, name: board.name, description: board.description };
            return boarMapped;
        });
    }

    async getBoard(boardId: number): Promise<GetBoardOutput> {
        const board = await this.boardRepository.get(boardId);
        const output: GetBoardOutput = {
            id: boardId,
            name: board.name,
            estimative: 0,
            columns: [],
        };
        const columnsOrder = board.getColumnsOrder();
        const columns = await this.columnRepository.findAllBy(boardId);
        for (const column of columns) {
            const columnOutput: ColumnOutput = {
                id: column.id,
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
                columnOutput.cards.push({ id: card.id, title: card.title, estimative: card.estimative });
            }
            const columnIdex = columnsOrder.indexOf(column.id);
            output.columns.splice(columnIdex, 0, columnOutput);
        }
        return output;
    }

    async saveBoard(input: CreateBoardInput): Promise<number> {
        const board = new Board(input.name, input.description);
        const boardId = await this.boardRepository.save(board);
        return boardId;
    }

    async addColumn(input: AddColumnInput): Promise<number> {
        const board = await this.boardRepository.get(input.boardId);
        const column = new Column(input.column.name, input.column.hasEstimative);
        const columnId = await this.columnRepository.save(column, input.boardId);
        board.addColumn(columnId);
        await this.boardRepository.update(board);
        return columnId;
    }
}

type AddColumnInput = {
    boardId: number;
    column: {
        name: string;
        hasEstimative: boolean;
    };
};

type CreateBoardInput = {
    name: string;
    description: string;
};

type ColumnOutput = {
    id: number;
    name: string;
    estimative: number;
    hasEstimative: boolean;
    cards: { id: number; title: string; estimative: number }[];
};

type GetBoardOutput = {
    id: number;
    name: string;
    estimative: number;
    columns: ColumnOutput[];
};

type GetBoardsOutput = {
    id: number;
    name: string;
    description: string;
};
