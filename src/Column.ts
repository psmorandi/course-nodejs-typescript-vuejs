import Card from "./Card";

export default class Column {
    private cards: Card[];

    constructor(readonly name: string, readonly shouldCountCardTime: boolean) {
        this.cards = [];
    }

    attach(card: Card) {
        this.cards.push(card);
    }

    getCards(): Card[] {
        return this.cards;
    }

    getTotalEffort() {
        return this.cards.map(card => card.effort).reduce((prev, current) => prev + current);
    }
}