export default class Board {
    readonly columnsOrder: number[] = [];
    readonly id: number = 0;

    constructor(readonly name: string, readonly description: string, id?: number) {
        if (name === "") throw new Error("Name is required.");
        if (id) this.id = id;
    }

    addColumn(columnId: number) {
        this.columnsOrder.push(columnId);
    }

    getColumnsOrder(): number[] {
        return this.columnsOrder;
    }

    moveColumn(columnId: number, index: number) {
        const indexOfColumn = this.columnsOrder.findIndex((id) => id === columnId);
        if (indexOfColumn < 0) throw new Error("Column id not found.");
        this.columnsOrder.splice(indexOfColumn, 1);
        this.columnsOrder.splice(index, 0, columnId);
    }
}
