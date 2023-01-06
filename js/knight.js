import { Position } from "./position.js";
import { Piece } from "./piece.js";
import { PieceColor } from "./pieceColor.js";
class Knight extends Piece {
    constructor(globalInstances, board, position, color) {
        super(globalInstances, board, position, color, true);
    }
    draw() {
        let image;
        if (this.color === PieceColor.WHITE) {
            image = this.resources.getImage(this.constants.whiteKnightPath);
        }
        else if (this.color === PieceColor.BLACK) {
            image = this.resources.getImage(this.constants.blackKnightPath);
        }
        else {
            image = this.resources.getImage("");
        }
        this.sctx.drawImage(image, this.canvasPosition.x, this.canvasPosition.y, this.constants.tileWidth, this.constants.tileHeight);
    }
    getLegalMoves() {
        let moves = [];
        for (let i = -1; i < 2; i += 2) {
            for (let j = -2; i < 3; i += 4) {
                const move = new Position(this.matrixPosition.x + i, this.matrixPosition.y + j);
                if (!this.attackingOwnColor(move) &&
                    this.isOnBoard(move)) {
                    moves.push(move);
                }
            }
        }
        for (let i = -2; i < 3; i += 4) {
            for (let j = -1; j < 2; j += 2) {
                const move = new Position(this.matrixPosition.x + i, this.matrixPosition.y + j);
                if (!this.attackingOwnColor(move) &&
                    this.isOnBoard(move)) {
                    moves.push(move);
                }
            }
        }
        return moves;
    }
}
export { Knight };
