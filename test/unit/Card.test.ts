import Card from "../../src/domain/entity/Card";

test("Deve criar um cartão", () => {
    const card = new Card("Activity 1", 3);
    expect(card.title).toBe("Activity 1");
    expect(card.estimative).toBe(3);
});

test("Não deve criar um cartão sem título", () => {
    expect(() => new Card("", 3)).toThrow(new Error("Title is required."));
});

test("Não deve criar cartão com estimativa negativa", () => {
    expect(() => new Card("Title", -3)).toThrow(new Error("Estimative cant be negative."));
});
