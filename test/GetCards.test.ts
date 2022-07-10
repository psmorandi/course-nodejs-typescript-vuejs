import BoardRepositoryMemory from "../src/adapter/memory/BoardRepositoryMemory";
import Board from "../src/domain/Board";
import BoardRepository from "../src/domain/repository/BoardRepository";
import GetCards from "../src/domain/usecase/GetCards";

let getCards: GetCards;
let boardRepository: BoardRepository;

describe("Get Cards Test", function () {
    beforeEach(function () {
        boardRepository = new BoardRepositoryMemory();
        getCards = new GetCards(boardRepository);
    });

    test(`GET /boards/id/columns/id/cards, retorna os cartões da coluna`, function () {
        const board = new Board("TODO", "todo list");
        board.addColumn("BACKLOG", true);
        board.addColumn("DOING", true);
        board.addColumn("DONE", false);        
        const columnId = board.getColumns()[0].id;
        board.addCard(columnId, "DO USECASE", 60);
        board.addCard(columnId, "TEST USECASE", 120);
        boardRepository.save(board);
        const output = getCards.execute(board.id, columnId);
        expect(output).toHaveLength(2);
    });
});