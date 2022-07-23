import PgPromiseConnection from "../../src/infra/database/PgPromiseConnection";
import RepositoryDatabaseFactory from "../../src/infra/factory/RepositoryDatabaseFactory";
import BoardService from "../../src/service/BoardService";
import ColumnService from "../../src/service/ColumnService";

test("Deve listar os quadros", async function () {
    const connection = new PgPromiseConnection();
    const repositoryFactory = new RepositoryDatabaseFactory(connection);
    const boardService = new BoardService(repositoryFactory);
    const boardId = await boardService.saveBoard({ name: "Projeto 1", description: "Meu projeto 1" });
    const boards = await boardService.getBoards();
    const board = boards.find((b) => b.id === boardId);
    expect(board).toBeDefined();
    expect(board?.name).toBe("Projeto 1");
    await connection.close();
});

test("Deve retornar um quadro", async function () {
    const connection = new PgPromiseConnection();
    const repositoryFactory = new RepositoryDatabaseFactory(connection);
    const boardService = new BoardService(repositoryFactory);
    const columnService = new ColumnService(repositoryFactory);
    const boardId = await boardService.saveBoard({ name: "Projeto 1", description: "Meu projeto 1" });
    const backlogId = await boardService.addColumn({ boardId, column: { name: "Backlog", hasEstimative: true } });
    const doingId = await boardService.addColumn({ boardId, column: { name: "Doing", hasEstimative: true } });
    const doneId = await boardService.addColumn({ boardId, column: { name: "Done", hasEstimative: false } });
    await columnService.addCard({ columnId: backlogId, card: { title: "Task 1", estimative: 3 } });
    await columnService.addCard({ columnId: backlogId, card: { title: "Task 2", estimative: 2 } });
    await columnService.addCard({ columnId: backlogId, card: { title: "Task 3", estimative: 1 } });
    const board = await boardService.getBoard(boardId);
    expect(board.name).toBe("Projeto 1");
    expect(board.columns).toHaveLength(3);
    expect(board.estimative).toBe(6);
    const backlogColumn = board.columns.find((col) => col.id === backlogId);
    const doingColumn = board.columns.find((col) => col.id === doingId);
    const doneColumn = board.columns.find((col) => col.id === doneId);
    expect(backlogColumn?.estimative).toBe(6);
    expect(doingColumn?.estimative).toBe(0);
    expect(doneColumn?.estimative).toBe(0);
    await connection.close();
});

test("Deve salvar um quadro", async function () {
    const connection = new PgPromiseConnection();
    const repositoryFactory = new RepositoryDatabaseFactory(connection);
    const boardService = new BoardService(repositoryFactory);
    const boardId = await boardService.saveBoard({ name: "Projeto 4", description: "Meu projeto 4" });
    const board = await boardService.getBoard(boardId);
    expect(board.name).toBe("Projeto 4");
    await connection.close();
});

test("Deve criar uma coluna vinculada ao quadro", async () => {
    const connection = new PgPromiseConnection();
    const repositoryFactory = new RepositoryDatabaseFactory(connection);
    const boardService = new BoardService(repositoryFactory);
    const boardId = await boardService.saveBoard({ name: "Projeto 4", description: "Meu projeto 4" });
    const columnId = await boardService.addColumn({ boardId, column: { name: "Backlog", hasEstimative: true } });
    const board = await boardService.getBoard(boardId);
    expect(board.name).toBe("Projeto 4");
    expect(board.columns).toHaveLength(1);
    const [column] = board.columns;
    expect(column.id).toBe(columnId);
    expect(column.name).toBe("Backlog");
    expect(column.hasEstimative).toBe(true);
    await connection.close();
});
