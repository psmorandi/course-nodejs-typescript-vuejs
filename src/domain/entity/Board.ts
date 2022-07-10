import Card from "./Card";
import Column from "./Column";
import Entity from "./Entity";

export default class Board extends Entity {
    private columns: Column[];

    constructor(readonly name: string, readonly description: string) {
        super();
        this.columns = [];
    }

    addColumn(name: string, shouldCountCardTime: boolean) {
        this.columns.push(new Column(name, shouldCountCardTime));
    }

    addCard(columnId: string, title: string, effort: number) {
        const column = this.columns.find((col) => col.id === columnId);
        if (column) {
            column.attach(new Card(title, effort));
        }
    }

    getColumn(columnId: string) {
        return this.columns.find((col) => col.id === columnId);
    }

    getColumns(): Column[] {
        return this.columns;
    }
}
