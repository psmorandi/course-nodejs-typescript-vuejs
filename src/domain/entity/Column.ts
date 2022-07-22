export default class Column {
    readonly id: number = 0;
    readonly cards: number[] = [];

    constructor(readonly name: string, readonly hasEstimative: boolean, id?: number) {
        if (name === "") throw new Error("Name is required.");
        if (id) this.id = id;
    }

    addCard(cardId: number) {
        this.cards.push(cardId);
    }

    getCards(): number[] {
        return this.cards;
    }

    moveCard(cardId: number, index: number) {
        const indexOfCard = this.cards.findIndex((id) => id === cardId);
        if (indexOfCard < 0) throw new Error("Card id not found.");
        this.cards.splice(indexOfCard, 1);
        this.cards.splice(index, 0, cardId);
    }
}
