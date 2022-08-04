export default class Board {
  columns: any[];
  constructor(readonly name: string) {
    this.columns = [];
  }

  getEstimative() {
    return 0;
  }
}
