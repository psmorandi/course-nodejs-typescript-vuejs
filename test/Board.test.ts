import Board from "../src/domain/Board"

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
    expect(board.getColumns()).toHaveLength(3);
});

test('Deve associar cartões em cada uma das colunas contendo o título da tarefa e a estimativa em horas', () => {
    const board = new Board("name", "description");
    board.addColumn("TODO", true);
    board.addColumn("DOING", true);
    board.addColumn("DONE", false);
    const columnId = board.getColumns()[0].id
    board.addCard(columnId, "Task 1", 4);
    board.addCard(columnId, "Task 2", 1);
    board.addCard(columnId, "Task 3", 6);    
    const columnTodo = board.getColumn(columnId);
    expect(columnTodo).toBeDefined()
    expect(columnTodo?.getCards()).toHaveLength(3);
});

test('Deve ser possível calcular a estimativa total de cada coluna', () => {
    const board = new Board("name", "description");
    board.addColumn("TODO", true);
    board.addColumn("DOING", true);
    board.addColumn("DONE", false);
    const columnId = board.getColumns()[0].id
    board.addCard(columnId, "Task 1", 4);
    board.addCard(columnId, "Task 2", 1);
    board.addCard(columnId, "Task 3", 6);    
    const columnTodo = board.getColumn(columnId);
    expect(columnTodo?.getTotalEffort()).toBe(11);
});