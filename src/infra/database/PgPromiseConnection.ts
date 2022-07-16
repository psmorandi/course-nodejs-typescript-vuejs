import Connection from "./Connection";
import pgp from "pg-promise";

export default class PgPromiseConnection implements Connection {
    connection: any;

    constructor() {
        this.connection = pgp()("postgres://postgres:123456@postgres:5432/app-nodejs");
    }

    query(statement: string, params: any): Promise<any> {
        return this.connection.query(statement, params);
    }

    async close(): Promise<void> {
        return this.connection.$pool.end();
    }
}
