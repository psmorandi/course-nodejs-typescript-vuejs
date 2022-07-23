import Column from "../entity/Column";

export default interface ColumnRepository {
    findAllBy(boardId: number): Promise<Column[]>;
    save(column: Column, boardId: number): Promise<number>;
}