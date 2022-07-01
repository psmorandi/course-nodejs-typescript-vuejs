import Board from "../src/Board.js"
import Card from "../src/Card.js";

test('Deve criar um novo quadro com nome e descrição', () => {
    const name = "name";
    const description = "description";
    const board = new Board(name, description);
    expect(board.name).toBe(name);
    expect(board.description).toBe(description);
});

test('Deve permitir incluir colunas no quadro (por exemplo: Todo, Doing e Done) indicando se ela deve ou não contar o tempo do cartão', () => {
    const board = new Board("name", "description");
    board.addColumn("TODO", true);
    board.addColumn("DOING", true);
    board.addColumn("DONE", false);
    expect(board.columns).toHaveLength(3);
});

test('Deve associar cartões em cada uma das colunas contendo o título da tarefa e a estimativa em horas', () => {
    const board = new Board("name", "description");
    board.addColumn("TODO", true);
    board.addColumn("DOING", true);
    board.addColumn("DONE", false);
    board.addCard("TODO", "Task 1", 4);
    board.addCard("TODO", "Task 2", 1);
    board.addCard("TODO", "Task 3", 6);
    expect(board.getColumn("TODO").getCards()).toHaveLength(3);
});

test('Deve ser possível calcular a estimativa total de cada coluna', () => {
    const board = new Board("name", "description");
    board.addColumn("TODO", true);
    board.addColumn("DOING", true);
    board.addColumn("DONE", false);
    board.addCard("TODO", "Task 1", 4);
    board.addCard("TODO", "Task 2", 1);
    board.addCard("TODO", "Task 3", 6);
    expect(board.getColumn("TODO").getTotalEffort()).toBe(11);
});