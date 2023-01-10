import { GlobalInstances } from "./globalInstances.js";

import { Position } from "./position.js";
import { Move } from "./move.js";
import { MoveType } from "./moveType.js";
import { Board } from "./board.js";
import { Piece } from "./piece";
import { InvalidPiece } from "./invalidPiece.js";

class InvalidMove extends Move {

    constructor() {
        super(MoveType.NONE, new Position(0, 0), new Position(0, 0));
    }
}

export { InvalidMove };