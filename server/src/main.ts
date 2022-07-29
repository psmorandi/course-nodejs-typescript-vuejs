import BoardsController from "./infra/controller/BoardsController";
import PgPromiseConnection from "./infra/database/PgPromiseConnection";
import RepositoryDatabaseFactory from "./infra/factory/RepositoryDatabaseFactory";
import ExpressAdapter from "./infra/http/ExpressAdapter";

const http = new ExpressAdapter();
const connection = new PgPromiseConnection();
const repositoryFactory = new RepositoryDatabaseFactory(connection);
new BoardsController(http, repositoryFactory);
console.log("Running.");
http.listen(3000);
process.on("exit", async function () {
    await connection.close();
});