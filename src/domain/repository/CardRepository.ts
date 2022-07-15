import Card from "../entity/Card";

export default interface CardRepository {
    findAllBy(columnId: number): Promise<Card[]>;
}