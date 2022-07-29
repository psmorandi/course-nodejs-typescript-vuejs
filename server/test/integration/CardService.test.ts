import PgPromiseConnection from "../../src/infra/database/PgPromiseConnection";
import RepositoryDatabaseFactory from "../../src/infra/factory/RepositoryDatabaseFactory";
import CardRepositoryDatabase from "../../src/infra/repository/CardRepositoryDatabase";
import BoardService from "../../src/service/BoardService";
import CardService from "../../src/service/CardService";
import ColumnService from "../../src/service/ColumnService";

test("Deve listar os cards", async function () {
    const connection = new PgPromiseConnection();
    const cardRepository = new CardRepositoryDatabase(connection);
    const repositoryFactory = new RepositoryDatabaseFactory(connection);
    const boardService = new BoardService(repositoryFactory);
    const columnService = new ColumnService(repositoryFactory);
    const boardId = await boardService.saveBoard({ name: "Projeto 1", description: "Meu projeto 1" });
    const backlogId = await boardService.addColumn({ boardId, column: { name: "Backlog", hasEstimative: true } });
    await boardService.addColumn({ boardId, column: { name: "Doing", hasEstimative: true } });
    await boardService.addColumn({ boardId, column: { name: "Done", hasEstimative: false } });
    await columnService.addCard({ columnId: backlogId, card: { title: "Task 1", estimative: 3 } });
    await columnService.addCard({ columnId: backlogId, card: { title: "Task 2", estimative: 2 } });
    await columnService.addCard({ columnId: backlogId, card: { title: "Task 3", estimative: 1 } });
    const cardService = new CardService(cardRepository);
    const cards = await cardService.getCards(backlogId);
    expect(cards).toHaveLength(3);
    await connection.close();
});
