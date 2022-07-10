import { randomUUID } from "crypto";

export default abstract class Entity {
    readonly id: string;
    constructor() {
        this.id = randomUUID();
    }
}