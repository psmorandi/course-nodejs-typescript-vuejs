import Card from "../../../domain/entity/Card";
import CardRepository from "../../../domain/repository/CardRepository";
import Connection from "../../database/Connection";

export default class CardRepositoryDatabase implements CardRepository {
    constructor(readonly connection: Connection) {}

    async findAllBy(columnId: number): Promise<Card[]> {
        const cardsData = await this.connection.query("select * from nodejs.card where id_column = $1", [columnId]);
        const cards: Card[] = [];
        for (const cardData of cardsData) {
            const card = new Card(cardData.title, cardData.estimative);
            cards.push(card);
        }
        return cards;
    }
}
