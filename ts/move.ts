import { Position } from "./position.js";
import { MoveType } from "./moveType.js";

class Move {

    type: MoveType;
    position: Position;

    constructor(type: MoveType, position: Position) {
        this.type = type;
        this.position = position;
    }
}

export { Move };