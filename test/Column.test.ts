import Column from "../src/domain/entity/Column";

test("Deve criar uma coluna", () => {
    const card = new Column("TODO", true);
    expect(card.name).toBe("TODO");
    expect(card.hasEstimative).toBe(true);
});

test("Não deve criar um coluna sem nome", () => {
    expect(() => new Column("", true)).toThrow(new Error("Name is required."));
});