export default class Board {
    columnIndexes: number[] = [];

    constructor(readonly name: string, readonly description: string) {
        if (name === "") throw new Error("Name is required.");
    }

    addColumn(columnId: number) {
        this.columnIndexes.push(columnId);
    }

    moveColumn(columnId: number, index: number) {
        const indexOfColumn = this.columnIndexes.findIndex((id) => id === columnId);
        if (indexOfColumn < 0) throw new Error("Column id not found.");
        this.columnIndexes.splice(indexOfColumn, 1);
        this.columnIndexes.splice(index, 0, columnId);
    }
}
