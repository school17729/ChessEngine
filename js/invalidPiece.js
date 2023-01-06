import { Position } from "./position.js";
import { Piece } from "./piece.js";
import { PieceColor } from "./pieceColor.js";
class InvalidPiece extends Piece {
    constructor(globalInstances, board) {
        super(globalInstances, board, new Position(0, 0), PieceColor.NONE, false);
    }
    draw() {
        this.console.log("[InvalidPiece]: draw was called on an InvalidPiece.");
    }
    getLegalMoves(board) {
        this.console.log("[InvalidPiece]: getLegalMoves was called on an InvalidPiece.");
        return [];
    }
}
export { InvalidPiece };
