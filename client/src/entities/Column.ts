import Card from "./Card";

export default class Column {
  cards: Card[];
  constructor(readonly name: string, readonly hasEstimative: boolean) {
    this.cards = [];
  }

  addCard(cardTitle: string, cardEstimative: number) {
    this.cards.push(new Card(cardTitle, cardEstimative));
  }

  getEstimative() {
    return this.cards.reduce((total: number, card: Card) => {
      total += card.estimative;
      return total;
    }, 0);
  }
}
