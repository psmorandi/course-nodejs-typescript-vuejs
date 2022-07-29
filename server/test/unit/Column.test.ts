import Column from "../../src/domain/entity/Column";

test("Deve criar uma coluna", () => {
    const column = new Column("TODO", true);
    expect(column.name).toBe("TODO");
    expect(column.hasEstimative).toBe(true);
});

test("Não deve criar um coluna sem nome", () => {
    expect(() => new Column("", true)).toThrow(new Error("Name is required."));
});

test("Deve adicionar cards", () => {
    const column = new Column("TODO", true);
    column.addCard(1);
    column.addCard(2);
    column.addCard(3);
    expect(column.getCardsOrder()).toHaveLength(3);
});

test("Deve mover a ordem dos cards", () => {
    const column = new Column("TODO", true);
    column.addCard(1);
    column.addCard(2);
    column.addCard(3);
    expect(column.getCardsOrder()).toHaveLength(3);
    column.moveCard(2, 0);
    const cards = column.getCardsOrder();
    expect(cards[0]).toBe(2);
    expect(cards[1]).toBe(1);
    expect(cards[2]).toBe(3);
});
