import CardRepository from "../domain/repository/CardRepository";

export default class CardService {
    constructor(readonly cardRepository: CardRepository) {}

    async getCards(columnId: number) {
        return await this.cardRepository.findAllBy(columnId);
    }

    async getCard(cardId: number) {
        return await this.cardRepository.get(cardId);
    }
}
