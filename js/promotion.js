import { Move } from "./move.js";
import { MoveType } from "./moveType.js";
class Promotion extends Move {
    constructor(oldPosition, newPosition, newPieceType) {
        super(MoveType.PROMOTION, oldPosition, newPosition);
        this.newPieceType = newPieceType;
    }
}
export { Promotion };
