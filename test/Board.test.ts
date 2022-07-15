import Board from "../src/domain/entity/Board";

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