import Column from "../../../domain/entity/Column";
import ColumnRepository from "../../../domain/repository/ColumnRepository";
import Connection from "../../database/Connection";

export default class ColumnRepositoryDatabase implements ColumnRepository {
    constructor(readonly connection: Connection) {}

    async findAllBy(boardId: number): Promise<Column[]> {
        const columnsData = await this.connection.query("select * from nodejs.column where id_board = $1", [boardId]);
        const columns: Column[] = [];
        for (const columnData of columnsData) {
            const column = new Column(columnData.name, columnData.has_estimative, columnData.id_column);
            columns.push(column);
        }
        return columns;
    }
}
