import { randomUUID } from "crypto";

export default abstract class Entity {
    protected readonly id: string;
    constructor() {
        this.id = randomUUID();
    }
}