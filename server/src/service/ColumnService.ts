import Card from "../domain/entity/Card";
import RepositoryAbstractFactory from "../domain/factory/RepositoryAbstractFactory";
import CardRepository from "../domain/repository/CardRepository";
import ColumnRepository from "../domain/repository/ColumnRepository";

export default class ColumnService {
    readonly columnRepository: ColumnRepository;
    readonly cardRepository: CardRepository;

    constructor(readonly repositoryFactory: RepositoryAbstractFactory) {
        this.columnRepository = repositoryFactory.createColumnRepository();
        this.cardRepository = repositoryFactory.createCardRepository();
    }

    async getColumns(boardId: number) {
        return await this.columnRepository.findAllBy(boardId);
    }

    async addCard(input: AddCardInput): Promise<number> {
        const column = await this.columnRepository.get(input.columnId);
        const cardId = await this.cardRepository.save(
            input.columnId,
            new Card(input.card.title, input.card.estimative)
        );
        column.addCard(cardId);
        await this.columnRepository.update(column);
        return cardId;
    }

    async moveCardToAnotherColumn(input: MoveCardInput) {
        const fromColumn = await this.columnRepository.get(input.fromColumnId);
        const toColumn = await this.columnRepository.get(input.toColumnId);
        fromColumn.removeCard(input.cardId);
        toColumn.addCard(input.cardId);
        await this.columnRepository.update(fromColumn);
        await this.columnRepository.update(toColumn);
    }
}

type AddCardInput = { columnId: number; card: { title: string; estimative: number } };
type MoveCardInput = {
    cardId: number;
    fromColumnId: number;
    toColumnId: number;
};
