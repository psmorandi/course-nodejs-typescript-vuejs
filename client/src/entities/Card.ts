export default class Card {
  id?: number;

  constructor(readonly title: string, public estimative: number) {}

  increaseEstimative() {
    this.estimative++;
  }

  decreaseEstimative() {
    this.estimative--;
  }
}
