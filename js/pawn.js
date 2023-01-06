import { Position } from "./position.js";
import { Piece } from "./piece.js";
import { PieceColor } from "./pieceColor.js";
class Pawn extends Piece {
    constructor(globalInstances, board, position, color) {
        super(globalInstances, board, position, color, true);
        this.movedForwardTwoTiles = false;
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
        let move;
        for (let i = -1; i < 2; i += 2) {
            let move;
            if (this.color === PieceColor.WHITE) {
                move = new Position(this.matrixPosition.x + i, this.matrixPosition.y - 1);
            }
            else if (this.color === PieceColor.BLACK) {
                move = new Position(this.matrixPosition.x + i, this.matrixPosition.y + 1);
            }
            else {
                move = new Position(0, 0);
            }
            if (this.attackingOppositeColor(move) &&
                this.isOnBoard(move)) {
                moves.push(move);
            }
        }
        if (this.color === PieceColor.WHITE) {
            move = new Position(this.matrixPosition.x, this.matrixPosition.y - 1);
        }
        else if (this.color === PieceColor.BLACK) {
            move = new Position(this.matrixPosition.x, this.matrixPosition.y + 1);
        }
        else {
            move = new Position(0, 0);
        }
        if (!this.attackingOwnColor(move) &&
            this.isOnBoard(move)) {
            moves.push(move);
        }
        if (this.moveCount === 0) {
            if (this.color === PieceColor.WHITE) {
                move = new Position(this.matrixPosition.x, this.matrixPosition.y - 2);
            }
            else if (this.color === PieceColor.BLACK) {
                move = new Position(this.matrixPosition.x, this.matrixPosition.y + 2);
            }
            else {
                move = new Position(0, 0);
            }
        }
        if (!this.attackingOwnColor(move) &&
            this.isOnBoard(move)) {
            moves.push(move);
        }
        return moves;
    }
}
export { Pawn };
