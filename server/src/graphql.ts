import { ApolloServer } from "apollo-server";
import PgPromiseConnection from "./infra/database/PgPromiseConnection";
import RepositoryDatabaseFactory from "./infra/factory/RepositoryDatabaseFactory";
import CardRepositoryDatabase from "./infra/repository/CardRepositoryDatabase";
import BoardService from "./service/BoardService";
import CardService from "./service/CardService";
import ColumnService from "./service/ColumnService";

const connection = new PgPromiseConnection();
const repositoryFactory = new RepositoryDatabaseFactory(connection);
const boardService = new BoardService(repositoryFactory);
const columnService = new ColumnService(repositoryFactory);
const cardService = new CardService(new CardRepositoryDatabase(connection));

const typeDefs = `
    type Board {
        id: Int
        name: String
        columns: [Column]
    }

    type Column {
        id: Int
        name: String
        hasEstimative: Boolean
        cards: [Card]
    }

    type Card {
        id: Int
        title: String
        estimative: Int
    }

    type Query {
        boards: [Board]
        board(boardId: Int): Board
    }

    input BoardInput {
        name: String
        description: String
    }

    input CardInput {
        columnId: Int
        title: String
        estimative: Int
    }

    type Mutation {
        saveBoard(board: BoardInput): Board
        saveCard(card: CardInput): Card
    }
`;

const resolvers = {
    Query: {
        boards() {
            return boardService.getBoards();
        },
        async board(_parent: any, params: any) {
            return await boardService.getBoard(params.boardId);
        },
    },
    Mutation: {
        async saveBoard(_parent: any, params: any) {
            const boardId = await boardService.saveBoard(params.board);
            return await boardService.getBoard(boardId);
        },
        async saveCard(_parent: any, params: any) {
            const addCardInput = {
                columnId: params.columnId,
                card: { title: params.title, estimative: params.estimative },
            };
            const cardId = await columnService.addCard(addCardInput);
            return cardService.getCard(cardId);
        },
    },
    Board: {
        columns(parent: any) {
            return columnService.getColumns(parent.id);
        },
    },
    Column: {
        cards(parent: any) {
            return cardService.getCards(parent.id);
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen(3002);
