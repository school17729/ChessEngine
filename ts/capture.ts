import { Position } from "./position.js";
import { Move } from "./move.js";
import { MoveType } from "./moveType.js";

class Capture extends Move {

    constructor(oldPosition: Position, newPosition: Position) {
        super(MoveType.CAPTURE, oldPosition, newPosition);
    }
}

export { Capture };