import { Position } from "./position.js";
import { Move } from "./move.js";
import { MoveType } from "./moveType.js";

class Pass extends Move {

    constructor(oldPosition: Position, newPosition: Position) {
        super(MoveType.PASS, oldPosition, newPosition);
    }
}

export { Pass };