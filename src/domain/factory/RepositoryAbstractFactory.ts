import BoardRepository from "../repository/BoardRepository";
import CardRepository from "../repository/CardRepository";
import ColumnRepository from "../repository/ColumnRepository";

export default interface RepositoryAbstractFactory {
    createBoardRepository(): BoardRepository;
    createColumnRepository(): ColumnRepository;
    createCardRepository(): CardRepository;
}
