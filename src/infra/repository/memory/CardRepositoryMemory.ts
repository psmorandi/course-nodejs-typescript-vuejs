import Card from "../../../domain/entity/Card";
import CardRepository from "../../../domain/repository/CardRepository";

export default class CardRepositoryMemory implements CardRepository {
    private data: Map<number, Card[]>;

    constructor() {
        this.data = new Map();
    }

    findAllBy(columnId: number): Promise<Card[]> {
        const cards = this.data.get(columnId);
        if (cards === undefined) throw new Error("Board not found.");
        return Promise.resolve(cards);
    }
}
