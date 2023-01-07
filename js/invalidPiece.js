import { Position } from "./position.js";
import { Piece } from "./piece.js";
import { PieceType } from "./pieceType.js";
import { PieceColor } from "./pieceColor.js";
class InvalidPiece extends Piece {
    constructor(globalInstances, board) {
        super(globalInstances, board, new Position(0, 0), PieceType.NONE, PieceColor.NONE, false);
    }
    draw() {
    }
    getLegalMoves() {
        this.console.log("[InvalidPiece]: getLegalMoves was called on an InvalidPiece.");
        return [];
    }
    move(move) {
        this.moveBase(move);
    }
}
export { InvalidPiece };
