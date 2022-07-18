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

    async calculateEstimative(boardId: number): Promise<number> {
        const columns = await this.columnRepository.findAllBy(boardId);
        let estimative: number = 0;
        for (const column of columns) {
            if (column.hasEstimative) {
                const cards = await this.cardRepository.findAllBy(column.id);
                estimative += cards.reduce((total, card) => {
                    total += card.estimative;
                    return total;
                }, 0);
            }
        }
        return estimative;
    }
}
