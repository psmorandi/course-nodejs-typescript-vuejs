export default class Board {
    readonly columns: number[] = [];
    readonly id: number = 0;

    constructor(readonly name: string, readonly description: string, id?: number) {
        if (name === "") throw new Error("Name is required.");
        if (id) this.id = id;
    }

    addColumn(columnId: number) {
        this.columns.push(columnId);
    }

    getColumns(): number[] {
        return this.columns;
    }

    moveColumn(columnId: number, index: number) {
        const indexOfColumn = this.columns.findIndex((id) => id === columnId);
        if (indexOfColumn < 0) throw new Error("Column id not found.");
        this.columns.splice(indexOfColumn, 1);
        this.columns.splice(index, 0, columnId);
    }
}
