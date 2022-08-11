import Card from "./Card";

export default class Column {
  id?: number;
  cards: Card[];

  constructor(readonly name: string, readonly hasEstimative: boolean) {
    this.cards = [];
  }

  addCard(card: Card) {
    this.cards.push(card);
  }

  deleteCard(cardId: number) {
    const card = this.cards.find((card) => card.id === cardId);
    if (!card) throw new Error("Card not found");
    this.cards.splice(this.cards.indexOf(card), 1);
  }

  getEstimative() {
    return this.cards.reduce((total: number, card: any) => {
      total += card.estimative;
      return total;
    }, 0);
  }
}
