import Card from "./Card";
export default class Board {
    constructor(readonly name: string, readonly description: string) {
        if(name === "") throw new Error("Name is required.");
    }
}
