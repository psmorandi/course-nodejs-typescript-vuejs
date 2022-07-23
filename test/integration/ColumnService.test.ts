import PgPromiseConnection from "../../src/infra/database/PgPromiseConnection";
import RepositoryDatabaseFactory from "../../src/infra/factory/RepositoryDatabaseFactory";
import BoardService from "../../src/service/BoardService";
import ColumnService from "../../src/service/ColumnService";

test("Deve listar as colunas", async function () {
    const connection = new PgPromiseConnection();
    const repositoryFactory = new RepositoryDatabaseFactory(connection);
    const boardService = new BoardService(repositoryFactory);
    const columnService = new ColumnService(repositoryFactory);
    const boardId = await boardService.saveBoard({ name: "Projeto 1", description: "Meu projeto 1" });
    await boardService.addColumn({ boardId, column: { name: "Backlog", hasEstimative: true } });
    await boardService.addColumn({ boardId, column: { name: "Doing", hasEstimative: true } });
    await boardService.addColumn({ boardId, column: { name: "Done", hasEstimative: false } });
    const columns = await columnService.getColumns(boardId);
    expect(columns).toHaveLength(3);
    await connection.close();
});

test("Deve salvar um card vinculado a coluna", async function () {
    const connection = new PgPromiseConnection();
    const repositoryFactory = new RepositoryDatabaseFactory(connection);
    const boardService = new BoardService(repositoryFactory);
    const boardId = await boardService.saveBoard({ name: "Projeto 5", description: "Meu projeto 5" });
    const columnId = await boardService.addColumn({ boardId, column: { name: "Backlog", hasEstimative: true } });
    await boardService.addColumn({ boardId, column: { name: "Doing", hasEstimative: true } });
    await boardService.addColumn({ boardId, column: { name: "Done", hasEstimative: false } });
    const columnService = new ColumnService(repositoryFactory);
    const card1Id = await columnService.addCard({ columnId, card: { title: "Task 1", estimative: 3 } });
    const card2Id = await columnService.addCard({ columnId, card: { title: "Task 2", estimative: 2 } });
    const card3Id = await columnService.addCard({ columnId, card: { title: "Task 3", estimative: 1 } });
    const columns = await columnService.getColumns(boardId);
    expect(columns).toHaveLength(3);
    const column = columns.find((col) => col.id === columnId);
    expect(column).toBeDefined();
    expect(column?.name).toBe("Backlog");
    expect(column?.hasEstimative).toBe(true);
    expect(column?.getCardsOrder()).toHaveLength(3);
    const [card1, card2, card3] = column?.getCardsOrder() || [];
    expect(card1).toBe(card1Id);
    expect(card2).toBe(card2Id);
    expect(card3).toBe(card3Id);
    await connection.close();
});
