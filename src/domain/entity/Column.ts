export default class Column {
    readonly id: number = 0;

    constructor(readonly name: string, readonly hasEstimative: boolean, id?: number) {
        if (name === "") throw new Error("Name is required.");
        if (id) {
            this.id = id;
        }
    }
}
