import Board from "../../src/domain/entity/Board";

test("Deve criar um novo quadro com nome e descrição", () => {
    const name = "name";
    const description = "description";
    const board = new Board(name, description);
    expect(board.name).toBe(name);
    expect(board.description).toBe(description);
});

test("Não deve criar um novo quadro sem nome", () => {
    expect(() => new Board("", "description")).toThrow(new Error("Name is required."));
});

test("Deve mover uma coluna para outra posição", () => {
    const name = "name";
    const description = "description";
    const board = new Board(name, description);
    board.addColumn(1);
    board.addColumn(2);
    board.addColumn(3);
    board.addColumn(4);
    expect(board.getColumns()).toHaveLength(4);
    board.moveColumn(3, 1);
    const columns = board.getColumns();
    expect(columns[0]).toBe(1);
    expect(columns[1]).toBe(3);
    expect(columns[2]).toBe(2);
    expect(columns[3]).toBe(4);
});
