import { Position } from "./position.js";
import { Move } from "./move.js";
import { MoveType } from "./moveType.js";
import { Piece } from "./piece.js";
import { PieceType } from "./pieceType.js";
import { PieceColor } from "./pieceColor.js";
class Rook extends Piece {
    constructor(globalInstances, board, position, color) {
        super(globalInstances, board, position, PieceType.ROOK, color, true);
    }
    draw() {
        let image;
        if (this.color === PieceColor.WHITE) {
            image = this.resources.getImage(this.constants.whiteRookPath);
        }
        else if (this.color === PieceColor.BLACK) {
            image = this.resources.getImage(this.constants.blackRookPath);
        }
        else {
            image = this.resources.getImage("");
        }
        this.sctx.drawImage(image, this.canvasPosition.x, this.canvasPosition.y, this.constants.tileWidth, this.constants.tileHeight);
    }
    getLegalMoves() {
        let moves = [];
        for (let i = 0; i < this.constants.boardMatrixSize; i++) {
            let movePosition = new Position(this.matrixPosition.x, i);
            if (!this.attackingOwnColor(movePosition) &&
                !this.goingThroughPieces(movePosition) &&
                this.isOnBoard(movePosition)) {
                moves.push(new Move(MoveType.MOVE, movePosition));
            }
        }
        for (let i = 0; i < this.constants.boardMatrixSize; i++) {
            let movePosition = new Position(i, this.matrixPosition.y);
            if (!this.attackingOwnColor(movePosition) &&
                !this.goingThroughPieces(movePosition) &&
                this.isOnBoard(movePosition)) {
                moves.push(new Move(MoveType.MOVE, movePosition));
            }
        }
        return moves;
    }
    move(move) {
        this.moveBase(move);
    }
}
export { Rook };
