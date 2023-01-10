import { Position } from "./position";
import { MoveType } from "./moveType";

class Move {
    type: MoveType;
    oldPosition: Position;
    newPosition: Position;

    constructor(type: MoveType, oldPosition: Position, newPosition: Position) {
        this.type = type;
        this.oldPosition = oldPosition;
        this.newPosition = newPosition;
    }
}

export { Move };