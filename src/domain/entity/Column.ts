import Card from "./Card";
import Entity from "./Entity";

export default class Column extends Entity {
    private cards: Card[];

    constructor(readonly name: string, readonly shouldCountCardTime: boolean) {
        super();
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