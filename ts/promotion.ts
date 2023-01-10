import { GlobalInstances } from "./globalInstances.js";

import { Position } from "./position.js";
import { Move } from "./move.js";
import { MoveType } from "./moveType.js";
import { PieceType } from "./pieceType.js";
import { Piece } from "./piece.js";

class Promotion extends Move {

    newPieceType: PieceType;

    constructor(oldPosition: Position, newPosition: Position, newPieceType: PieceType) {
        super(MoveType.PROMOTION, oldPosition, newPosition);

        this.newPieceType = newPieceType;
    }
}

export { Promotion };