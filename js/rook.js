import { Position } from "./position.js";
import { Piece } from "./piece.js";
import { PieceColor } from "./pieceColor.js";
class Rook extends Piece {
    constructor(globalInstances, board, position, color) {
        super(globalInstances, board, position, color, true);
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
            let move = new Position(this.matrixPosition.x, i);
            if (!this.attackingOwnColor(move) &&
                !this.goingThroughPieces(move) &&
                this.isOnBoard(move)) {
                moves.push(move);
            }
        }
        for (let i = 0; i < this.constants.boardMatrixSize; i++) {
            let move = new Position(i, this.matrixPosition.y);
            if (!this.attackingOwnColor(move) &&
                !this.goingThroughPieces(move) &&
                this.isOnBoard(move)) {
                moves.push(move);
            }
        }
        return moves;
    }
}
export { Rook };
