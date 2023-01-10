import { Move } from "./move.js";
import { MoveType } from "./moveType.js";
class Castle extends Move {
    constructor(oldPosition, newPosition, oldRookPosition, newRookPosition) {
        super(MoveType.CASTLE, oldPosition, newPosition);
        this.oldRookPosition = oldRookPosition;
        this.newRookPosition = newRookPosition;
    }
}
export { Castle };
