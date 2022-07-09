import Entity from "./Entity";

export default class Card extends Entity {
    constructor(readonly title: string, readonly effort: number) {
        super();
    }
}