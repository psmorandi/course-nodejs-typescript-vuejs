import ColumnRepository from "../domain/repository/ColumnRepository";

export default class ColumnService {
    constructor(readonly columnRepository: ColumnRepository) {}

    async getColumns(boardId: number) {
        return await this.columnRepository.findAllBy(boardId);
    }
}
