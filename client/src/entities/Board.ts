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
    const column = new Column(columnName, hasEstimative);
    this.columns.push(column);
    this.publish(
      new DomainEvent("addColumn", {
        boardId: this.id,
        name: columnName,
        hasEstimative,
        column,
      })
    );
  }

  addCard(columnName: string, cardTitle: string, cardEstimative: number) {
    const column = this.columns.find((column) => column.name === columnName);
    if (!column) throw new Error("Column not found");
    const card = new Card(cardTitle, cardEstimative);
    column.addCard(card);
    this.publish(
      new DomainEvent("addCard", {
        boardId: this.id,
        columId: column.id,
        title: cardTitle,
        estimative: cardEstimative
      })
    );
  }

  deleteColumn(columnId: number) {
    const column = this.columns.find((column) => column.id === columnId);
    if (!column) throw new Error("Column not found");
    this.columns.splice(this.columns.indexOf(column), 1);
    this.publish(
      new DomainEvent("deleteColumn", {
        boardId: this.id,
        columnId: column.id,
      })
    );
  }

  deleteCard(column: Column, cardId: number) {
    column.deleteCard(cardId);
    this.publish(
      new DomainEvent("deleteCard", {
        boardId: this.id,
        columnId: column.id,
        cardId,
      })
    );
  }

  increaseEstimative(column: Column, card: Card) {
    card.increaseEstimative();
    this.publish(
      new DomainEvent("increaseEstimative", {
        boardId: this.id,
        columnId: column.id,
        cardId: card.id,
        title: card.title,
        estimative: card.estimative,
      })
    );
  }

  decreaseEstimative(column: Column, card: Card) {
    card.decreaseEstimative();
    this.publish(
      new DomainEvent("decreaseEstimative", {
        boardId: this.id,
        columnId: column.id,
        cardId: card.id,
        title: card.title,
        estimative: card.estimative,
      })
    );
  }

  getEstimative() {
    return this.columns.reduce((total: number, column: Column) => {
      total += column.getEstimative();
      return total;
    }, 0);
  }
}
