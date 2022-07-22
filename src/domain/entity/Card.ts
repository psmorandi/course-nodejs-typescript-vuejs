export default class Card {
    readonly id: number = 0;

    constructor(readonly title: string, readonly estimative: number, id?: number) {
        if (title === "") throw new Error("Title is required.");
        if (estimative < 0) throw new Error("Estimative cant be negative.");
        if (id) this.id = id;
    }
}
