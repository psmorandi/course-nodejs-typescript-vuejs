export default class Board {
    readonly columns: number[] = [];

    constructor(readonly name: string, readonly description: string) {
        if (name === "") throw new Error("Name is required.");
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
