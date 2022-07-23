export default class Column {
    readonly id: number = 0;
    readonly cardsOrder: number[] = [];

    constructor(readonly name: string, readonly hasEstimative: boolean, id?: number) {
        if (name === "") throw new Error("Name is required.");
        if (id) this.id = id;
    }

    addCard(cardId: number) {
        this.cardsOrder.push(cardId);
    }

    getCardsOrder(): number[] {
        return this.cardsOrder;
    }

    moveCard(cardId: number, index: number) {
        const indexOfCard = this.cardsOrder.findIndex((id) => id === cardId);
        if (indexOfCard < 0) throw new Error("Card id not found.");
        this.cardsOrder.splice(indexOfCard, 1);
        this.cardsOrder.splice(index, 0, cardId);
    }
}
