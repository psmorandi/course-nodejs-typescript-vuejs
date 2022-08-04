import Board from "../src/entities/Board";

test("Deve criar um quadro", function () {
  const board = new Board("Projeto 1");
  expect(board.name).toBe("Projeto 1");
  expect(board.columns).toHaveLength(0);
  expect(board.getEstimative()).toBe(0);
});
