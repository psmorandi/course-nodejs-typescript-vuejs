import PgPromiseConnection from "../../src/infra/database/PgPromiseConnection";
import RepositoryDatabaseFactory from "../../src/infra/factory/RepositoryDatabaseFactory";
import BoardService from "../../src/service/BoardService";

test("Deve listar os quadros", async function () {
    const connection = new PgPromiseConnection();
    const repositoryFactory = new RepositoryDatabaseFactory(connection);
    const boardService = new BoardService(repositoryFactory);
    const boards = await boardService.getBoards();
    expect(boards).toHaveLength(1);
    const [board] = boards;
    expect(board.name).toBe("Projeto 1");
    await connection.close();
});

test("Deve retornar um quadro", async function () {
    const connection = new PgPromiseConnection();
    const repositoryFactory = new RepositoryDatabaseFactory(connection);
    const boardService = new BoardService(repositoryFactory);
    const boardId = await boardService.saveBoard({ name: "Projeto 1", description: "Meu projeto 1" });
    await boardService.addColumn({ boardId, column: { name: "Backlog", hasEstimative: true } });
    await boardService.addColumn({ boardId, column: { name: "Doing", hasEstimative: true } });
    await boardService.addColumn({ boardId, column: { name: "Done", hasEstimative: false } });
    const board = await boardService.getBoard(boardId);
    expect(board.name).toBe("Projeto 1");
    expect(board.columns).toHaveLength(3);
    expect(board.estimative).toBe(6);
    const [a, b, c] = board.columns;
    expect(a.estimative).toBe(6);
    expect(b.estimative).toBe(0);
    expect(c.estimative).toBe(0);
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
