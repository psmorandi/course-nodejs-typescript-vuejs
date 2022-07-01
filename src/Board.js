import Card from "./Card.js";
import Column from "./Column.js"

export default class Board {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.columns = [];
    }

    addColumn(name, shouldCountCardTime) {
        this.columns.push(new Column(name, shouldCountCardTime));
    }

    addCard(columnName, title, effort) {
        const column = this.columns.find((col) => col.name === columnName);
        if(column) {
            const card = new Card(title, effort);
            column.attach(card);
        }
    }

    getColumn(columnName) {
        return this.columns.find((col) => col.name === columnName);
    }
};