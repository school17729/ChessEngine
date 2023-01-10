import { Position } from "./position.js";
import { Move } from "./move.js";
import { MoveType } from "./moveType.js";

class Castle extends Move {

    oldRookPosition: Position;
    newRookPosition: Position;

    constructor(oldPosition: Position, newPosition: Position, oldRookPosition: Position, newRookPosition: Position) {
        super(MoveType.CASTLE, oldPosition, newPosition);

        this.oldRookPosition = oldRookPosition;
        this.newRookPosition = newRookPosition;
    }
    
}

export { Castle };