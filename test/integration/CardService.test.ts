import PgPromiseConnection from "../../src/infra/database/PgPromiseConnection";
import CardRepositoryDatabase from "../../src/infra/repository/database/CardRepositoryDatabase";
import CardService from "../../src/service/CardService";

test("Deve listar os cards", async function () {
    const connection = new PgPromiseConnection();
    const columnRepository = new CardRepositoryDatabase(connection);
    const columnService = new CardService(columnRepository);
    const columns = await columnService.getCards(1);
    expect(columns).toHaveLength(3);
    await connection.close();
});
