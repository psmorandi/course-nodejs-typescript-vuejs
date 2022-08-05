import DomainEvent from "../events/DomainEvent";
import BaseEntity from "./BaseEntity";
import Card from "./Card";
import Column from "./Column";

export default class Board extends BaseEntity {
  columns: Column[];
  constructor(readonly id: number, readonly name: string) {
    super();
    this.columns = [];
  }

  addColumn(columnName: string, hasEstimative: boolean) {
    this.columns.push(new Column(columnName, hasEstimative));
    this.publish(
      new DomainEvent("addColumn", {
        boardId: this.id,
        columnName,
        hasEstimative,
      })
    );
  }

  addCard(columnName: string, cardTitle: string, cardEstimative: number) {
    const column = this.columns.find((col) => {
      return col.name == columnName;
    });
    if (!column) throw new Error("Column not found");
    column.addCard(cardTitle, cardEstimative);
  }

  increaseEstimative(card: Card) {
    card.increaseEstimative();
  }

  getEstimative() {
    return this.columns.reduce((total: number, column: Column) => {
      total += column.getEstimative();
      return total;
    }, 0);
  }
}
