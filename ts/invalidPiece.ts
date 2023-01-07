import { GlobalInstances } from "./globalInstances.js";

import { Position } from "./position.js";
import { Move } from "./move.js";
import { MoveType } from "./moveType.js";
import { Board } from "./board.js";
import { Piece } from "./piece.js";
import { PieceType } from "./pieceType.js";
import { PieceColor } from "./pieceColor.js";

class InvalidPiece extends Piece {

    constructor(globalInstances: GlobalInstances, board: Board) {
        super(globalInstances, board, new Position(0, 0), PieceType.NONE, PieceColor.NONE, false);
    }

    draw(): void {
        
    }

    getLegalMoves(): Move[] {
        this.console.log("[InvalidPiece]: getLegalMoves was called on an InvalidPiece.");
        return [] as Move[];
    }

    move(move: Move): void {
        this.moveBase(move);
    }
}

export { InvalidPiece };