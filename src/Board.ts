import Card from "./Card";
import Column from "./Column";

export default class Board {
    private columns: Column[];

    constructor(readonly name: string, readonly description: string) {
        this.columns = [];
    }

    addColumn(name: string, shouldCountCardTime: boolean) {
        this.columns.push(new Column(name, shouldCountCardTime));
    }

    addCard(columnName: string, title: string, effort: number) {
        const column = this.columns.find((col) => col.name === columnName);
        if (column) {
            column.attach(new Card(title, effort));
        }
    }

    getColumn(columnName: string) {
        return this.columns.find((col) => col.name === columnName);
    }

    getColumns() {
        return this.columns;
    }
}