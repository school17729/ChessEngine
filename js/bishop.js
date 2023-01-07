import { Position } from "./position.js";
import { Move } from "./move.js";
import { MoveType } from "./moveType.js";
import { Piece } from "./piece.js";
import { PieceType } from "./pieceType.js";
import { PieceColor } from "./pieceColor.js";
class Bishop extends Piece {
    constructor(globalInstances, board, position, color) {
        super(globalInstances, board, position, PieceType.BISHOP, color, true);
    }
    draw() {
        let image;
        if (this.color === PieceColor.WHITE) {
            image = this.resources.getImage(this.constants.whiteBishopPath);
        }
        else if (this.color === PieceColor.BLACK) {
            image = this.resources.getImage(this.constants.blackBishopPath);
        }
        else {
            image = this.resources.getImage("");
        }
        this.sctx.drawImage(image, this.canvasPosition.x, this.canvasPosition.y, this.constants.tileWidth, this.constants.tileHeight);
    }
    getLegalMoves() {
        let moves = [];
        let startY = this.matrixPosition.y - this.matrixPosition.x;
        for (let i = 0; i < this.constants.boardMatrixSize; i++) {
            let movePosition = new Position(i, startY + i);
            if (!this.attackingOwnColor(movePosition) &&
                !this.goingThroughPieces(movePosition) &&
                this.isOnBoard(movePosition)) {
                moves.push(new Move(MoveType.MOVE, movePosition));
            }
        }
        let startX = this.matrixPosition.x + this.matrixPosition.y;
        for (let i = 0; i < this.constants.boardMatrixSize; i++) {
            let movePosition = new Position(startX - i, i);
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
export { Bishop };
