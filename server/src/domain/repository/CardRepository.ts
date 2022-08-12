import Card from "../entity/Card";

export default interface CardRepository {
    findAllBy(columnId: number): Promise<Card[]>;
    save(columnId: number, card: Card): Promise<number>;
    get(cardId: number): Promise<Card>;
}
