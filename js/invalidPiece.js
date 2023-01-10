import { Position } from "./position.js";
import { Piece } from "./piece.js";
import { PieceType } from "./pieceType.js";
import { PlayerColor } from "./playerColor.js";
class InvalidPiece extends Piece {
    constructor(globalInstances) {
        super(globalInstances, PieceType.NONE, PlayerColor.NONE, new Position(0, 0), false);
    }
    draw() {
        this.console.log("[InvalidPiece]: draw was called on an InvalidPiece.");
    }
    getLegalMoves() {
        this.console.log("[InvalidPiece]: getLegalMoves was called on an InvalidPiece.");
        return [];
    }
    move(move) {
        this.console.log("[InvalidPiece]: move was called on an InvalidPiece.");
        this.moveBase(move);
    }
}
export { InvalidPiece };
