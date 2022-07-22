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
    const board = await boardService.getBoard(1);
    expect(board.name).toBe("Projeto 1");
    expect(board.columns).toHaveLength(3);
    expect(board.estimative).toBe(6);
    const [a, b, c] = board.columns;
    expect(a.estimative).toBe(6);
    expect(b.estimative).toBe(0);
    expect(c.estimative).toBe(0);
    await connection.close();
});
