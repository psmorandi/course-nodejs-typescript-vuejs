import RepositoryAbstractFactory from "../../domain/factory/RepositoryAbstractFactory";
import BoardRepository from "../../domain/repository/BoardRepository";
import CardRepository from "../../domain/repository/CardRepository";
import ColumnRepository from "../../domain/repository/ColumnRepository";
import Connection from "../database/Connection";
import BoardRepositoryDatabase from "../repository/BoardRepositoryDatabase";
import CardRepositoryDatabase from "../repository/CardRepositoryDatabase";
import ColumnRepositoryDatabase from "../repository/ColumnRepositoryDatabase";

export default class RepositoryDatabaseFactory implements RepositoryAbstractFactory {
    constructor(readonly connection: Connection) {}

    createBoardRepository(): BoardRepository {
        return new BoardRepositoryDatabase(this.connection);
    }
    createColumnRepository(): ColumnRepository {
        return new ColumnRepositoryDatabase(this.connection);
    }
    createCardRepository(): CardRepository {
        return new CardRepositoryDatabase(this.connection);
    }
}
