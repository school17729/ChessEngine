import { GlobalInstances } from "./globalInstances.js";

import { Position } from "./position.js";
import { Board } from "./board.js";
import { Piece } from "./piece.js";
import { PieceColor } from "./pieceColor.js";

class InvalidPiece extends Piece {

    constructor(globalInstances: GlobalInstances, board: Board) {
        super(globalInstances, board, new Position(0, 0), PieceColor.NONE, false);
    }

    draw(): void {
        this.console.log("[InvalidPiece]: draw was called on an InvalidPiece.");
    }

    getLegalMoves(board: Board): Position[] {
        this.console.log("[InvalidPiece]: getLegalMoves was called on an InvalidPiece.");
        return [] as Position[];
    }
}

export { InvalidPiece };