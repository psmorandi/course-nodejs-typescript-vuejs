import Column from "../../domain/entity/Column";
import ColumnRepository from "../../domain/repository/ColumnRepository";
import Connection from "../database/Connection";

export default class ColumnRepositoryDatabase implements ColumnRepository {
    constructor(readonly connection: Connection) {}

    async update(column: Column): Promise<void> {
        await this.connection.query(
            "update nodejs.column set name = $1, has_estimative = $2, cards_order = $3 where id_column = $4",
            [column.name, column.hasEstimative, column.getCardsOrder().join(","), column.id]
        );
    }

    async get(columnId: number): Promise<Column> {
        const [columnData] = await this.connection.query("select * from nodejs.column where id_column = $1", [
            columnId,
        ]);
        const column = new Column(columnData.name, columnData.has_estimative, columnData.id_column);
        if (columnData.cards_order) {
            for (const cardId of columnData.cards_order.split(",")) {
                column.addCard(parseInt(cardId));
            }
        }
        return column;
    }

    async findAllBy(boardId: number): Promise<Column[]> {
        const columnsData = await this.connection.query("select * from nodejs.column where id_board = $1", [boardId]);
        const columns: Column[] = [];
        for (const columnData of columnsData) {
            const column = new Column(columnData.name, columnData.has_estimative, columnData.id_column);
            if (columnData.cards_order) {
                for (const cardId of columnData.cards_order.split(",")) {
                    column.addCard(parseInt(cardId));
                }
            }
            columns.push(column);
        }
        return columns;
    }

    async save(column: Column, boardId: number): Promise<number> {
        const [data] = await this.connection.query(
            "insert into nodejs.column (id_board, name, has_estimative) values ($1, $2, $3) RETURNING id_column",
            [boardId, column.name, column.hasEstimative]
        );
        return parseInt(data.id_column);
    }
}
