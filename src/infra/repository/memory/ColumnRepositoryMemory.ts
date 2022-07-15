import Column from "../../../domain/entity/Column";
import ColumnRepository from "../../../domain/repository/ColumnRepository";

export default class ColumnRepositoryMemory implements ColumnRepository {
    private data: Map<number, Column[]>;

    constructor() {
        this.data = new Map();
    }

    findAllBy(boardId: number): Promise<Column[]> {
        const columns = this.data.get(boardId);
        if (columns === undefined) throw new Error("Board not found.");
        return Promise.resolve(columns);
    }
}
