import BoardRepositoryMemory from "../src/adapter/memory/BoardRepositoryMemory";
import Board from "../src/domain/Board";
import BoardRepository from "../src/domain/repository/BoardRepository";
import GetColumns from "../src/domain/usecase/GetColumns";

let getColumns: GetColumns;
let boardRepository: BoardRepository;

describe("Get Columns Test", function () {
    beforeEach(function () {
        boardRepository = new BoardRepositoryMemory();
        getColumns = new GetColumns(boardRepository);
    });

    test(`GET /boards/id/columns, retorna as colunas do quadro`, function () {
        const board = new Board("TODO", "todo list");
        board.addColumn("BACKLOG", true);
        board.addColumn("DOING", true);
        board.addColumn("DONE", false);
        boardRepository.save(board);
        const output = getColumns.execute(board.id);
        expect(output).toHaveLength(3);
    });
});
