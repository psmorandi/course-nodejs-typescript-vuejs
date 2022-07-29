import axios from "axios";
import PgPromiseConnection from "../../src/infra/database/PgPromiseConnection";
import RepositoryDatabaseFactory from "../../src/infra/factory/RepositoryDatabaseFactory";
import BoardService from "../../src/service/BoardService";
import ColumnService from "../../src/service/ColumnService";

test("Deve retornar os quadros por meio da API", async function () {
    const response = await axios({
        url: "http://localhost:3000/boards",
        method: "get",
    });
    const boards = response.data;
    expect(boards).toHaveLength(1);
    const [board] = boards;
    expect(board.name).toBe("Projeto 1");
});

test("Deve retornar as colunas de um quadro por meio da API", async function () {
    const connection = new PgPromiseConnection();
    const repositoryFactory = new RepositoryDatabaseFactory(connection);
    const boardService = new BoardService(repositoryFactory);
    const boardId = await boardService.saveBoard({ name: "Projeto 1", description: "Meu projeto 1" });
    await boardService.addColumn({ boardId, column: { name: "Coluna A", hasEstimative: true } });
    await boardService.addColumn({ boardId, column: { name: "Coluna B", hasEstimative: true } });
    await boardService.addColumn({ boardId, column: { name: "Coluna C", hasEstimative: false } });
    const response = await axios({
        url: `http://localhost:3000/boards/${boardId}/columns`,
        method: "get",
    });
    const columns = response.data;
    expect(columns).toHaveLength(3);
    const [column1, column2, column3] = columns;
    expect(column1.name).toBe("Coluna A");
    expect(column1.hasEstimative).toBe(true);
    expect(column2.name).toBe("Coluna B");
    expect(column3.name).toBe("Coluna C");
});

test("Deve retornar os cartões de uma coluna por meio da API", async function () {
    const connection = new PgPromiseConnection();
    const repositoryFactory = new RepositoryDatabaseFactory(connection);
    const boardService = new BoardService(repositoryFactory);
    const columnService = new ColumnService(repositoryFactory);
    const boardId = await boardService.saveBoard({ name: "Projeto 1", description: "Meu projeto 1" });
    const backlogId = await boardService.addColumn({ boardId, column: { name: "Backlog", hasEstimative: true } });
    await boardService.addColumn({ boardId, column: { name: "Doing", hasEstimative: true } });
    await boardService.addColumn({ boardId, column: { name: "Done", hasEstimative: false } });
    await columnService.addCard({ columnId: backlogId, card: { title: "Atividade 1", estimative: 3 } });
    await columnService.addCard({ columnId: backlogId, card: { title: "Atividade 2", estimative: 2 } });
    await columnService.addCard({ columnId: backlogId, card: { title: "Atividade 3", estimative: 1 } });

    const response = await axios({
        url: `http://localhost:3000/boards/${boardId}/columns/${backlogId}/cards`,
        method: "get",
    });
    const cards = response.data;
    expect(cards).toHaveLength(3);
    const [card1, card2, card3] = cards;
    expect(card1.title).toBe("Atividade 1");
    expect(card2.title).toBe("Atividade 2");
    expect(card3.title).toBe("Atividade 3");
});

test("Deve calcular a estimativa total do quadro por meio da API", async function () {
    const connection = new PgPromiseConnection();
    const repositoryFactory = new RepositoryDatabaseFactory(connection);
    const boardService = new BoardService(repositoryFactory);
    const columnService = new ColumnService(repositoryFactory);
    const boardId = await boardService.saveBoard({ name: "Projeto 1", description: "Meu projeto 1" });
    const backlogId = await boardService.addColumn({ boardId, column: { name: "Backlog", hasEstimative: true } });
    await boardService.addColumn({ boardId, column: { name: "Doing", hasEstimative: true } });
    await boardService.addColumn({ boardId, column: { name: "Done", hasEstimative: false } });
    await columnService.addCard({ columnId: backlogId, card: { title: "Atividade 1", estimative: 3 } });
    await columnService.addCard({ columnId: backlogId, card: { title: "Atividade 2", estimative: 2 } });
    await columnService.addCard({ columnId: backlogId, card: { title: "Atividade 3", estimative: 1 } });

    const response = await axios({
        url: `http://localhost:3000/boards/${boardId}`,
        method: "get",
    });
    const estimative = response.data.estimative;
    expect(estimative).toBe(6);
});
