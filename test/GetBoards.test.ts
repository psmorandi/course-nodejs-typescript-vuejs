import BoardRepositoryMemory from "../src/adapter/repository/memory/BoardRepositoryMemory";
import Board from "../src/domain/entity/Board";
import BoardRepository from "../src/domain/repository/BoardRepository";
import GetBoards from "../src/domain/usecase/GetBoards";

let getBoards: GetBoards;
let boardRepository: BoardRepository;

describe("Get Boards Test", function () {
    beforeEach(function () {
        boardRepository = new BoardRepositoryMemory();
        getBoards = new GetBoards(boardRepository);
    });

    test(`GET /boards, sem inicializar nada na base retorna uma lista vazia`, function(){
        const boards = getBoards.execute();
        expect(boards).toBeDefined();
        expect(boards).toHaveLength(0);
    });

    test(`GET /boards, retorna os quadros`, function () {
        boardRepository.save(new Board("TODO", "todo list"));
        boardRepository.save(new Board("BUY", "buy list"));
        boardRepository.save(new Board("BILLS", "bills list"));
        const output = getBoards.execute();
        expect(output).toHaveLength(3);
    });
});