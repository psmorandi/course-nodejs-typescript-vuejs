export default class Column {
    constructor(name, shouldCountCardTime) {
        this.name = name;
        this.shouldCountCardTime = shouldCountCardTime;
        this.cards = [];
    }

    attach(card) {
        this.cards.push(card);
    }

    getCards() {
        return this.cards;
    }

    getTotalEffort() {
        return this.cards.map(card => card.effort).reduce((prev, current) => prev + current);
    }
};