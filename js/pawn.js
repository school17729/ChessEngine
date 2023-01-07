import { Position } from "./position.js";
import { Move } from "./move.js";
import { MoveType } from "./moveType.js";
import { Piece } from "./piece.js";
import { PieceType } from "./pieceType.js";
import { PieceColor } from "./pieceColor.js";
class Pawn extends Piece {
    constructor(globalInstances, board, position, color) {
        super(globalInstances, board, position, PieceType.PAWN, color, true);
        this.doublePushed = false;
    }
    draw() {
        let image;
        if (this.color === PieceColor.WHITE) {
            image = this.resources.getImage(this.constants.whitePawnPath);
        }
        else if (this.color === PieceColor.BLACK) {
            image = this.resources.getImage(this.constants.blackPawnPath);
        }
        else {
            image = this.resources.getImage("");
        }
        this.sctx.drawImage(image, this.canvasPosition.x, this.canvasPosition.y, this.constants.tileWidth, this.constants.tileHeight);
    }
    getLegalMoves() {
        let moves = [];
        let movePosition;
        for (let i = -1; i < 2; i += 2) {
            let movePosition;
            if (this.color === PieceColor.WHITE) {
                movePosition = new Position(this.matrixPosition.x + i, this.matrixPosition.y - 1);
            }
            else if (this.color === PieceColor.BLACK) {
                movePosition = new Position(this.matrixPosition.x + i, this.matrixPosition.y + 1);
            }
            else {
                movePosition = new Position(0, 0);
            }
            if (this.attackingOppositeColor(movePosition) &&
                this.isOnBoard(movePosition)) {
                moves.push(new Move(MoveType.MOVE, movePosition));
            }
        }
        if (this.color === PieceColor.WHITE) {
            movePosition = new Position(this.matrixPosition.x, this.matrixPosition.y - 1);
        }
        else if (this.color === PieceColor.BLACK) {
            movePosition = new Position(this.matrixPosition.x, this.matrixPosition.y + 1);
        }
        else {
            movePosition = new Position(0, 0);
        }
        if (!this.attackingOwnColor(movePosition) &&
            !this.attackingOppositeColor(movePosition) &&
            this.isOnBoard(movePosition)) {
            moves.push(new Move(MoveType.MOVE, movePosition));
        }
        if (!this.doublePushed) {
            if (this.moveCount === 0) {
                if (this.color === PieceColor.WHITE) {
                    movePosition = new Position(this.matrixPosition.x, this.matrixPosition.y - 2);
                }
                else if (this.color === PieceColor.BLACK) {
                    movePosition = new Position(this.matrixPosition.x, this.matrixPosition.y + 2);
                }
                else {
                    movePosition = new Position(0, 0);
                }
            }
            if (!this.attackingOwnColor(movePosition) &&
                !this.goingThroughPieces(movePosition) &&
                this.isOnBoard(movePosition)) {
                moves.push(new Move(MoveType.DOUBLE_PUSH, movePosition));
            }
        }
        return moves;
    }
    move(move) {
        this.moveBase(move);
        if (move.type === MoveType.DOUBLE_PUSH) {
            this.doublePushed = true;
        }
    }
}
export { Pawn };
