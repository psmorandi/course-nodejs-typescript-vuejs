import BoardsController from "./infra/controller/BoardsController";
import PgPromiseConnection from "./infra/database/PgPromiseConnection";
import ExpressAdapter from "./infra/http/ExpressAdapter";

//await connection.query("select * from nodejs.boards", []);
//await connection.query("select * from nodejs.columns where id_board = $1", [req.params.boardId]);

const http = new ExpressAdapter();
const connection = new PgPromiseConnection();
new BoardsController(http, connection);
console.log("Running.");
http.listen(3000);
