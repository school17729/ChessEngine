import { Position } from "./position.js";
import { Piece } from "./piece.js";
class Queen extends Piece {
    constructor(constants, resources, sctx, position, color) {
        super(constants, resources, sctx, position, color, true);
    }
    draw() {
        let image;
        if (this.color == "white") {
            image = this.resources.getImage(this.constants.whiteQueenPath);
        }
        else {
            image = this.resources.getImage(this.constants.blackQueenPath);
        }
        this.sctx.drawImage(image, this.canvasPosition.x, this.canvasPosition.y, this.constants.tileSize, this.constants.tileSize);
    }
    isMoveLegal(board, move) {
        return !this.isAttackingAllies(board, move) &&
            !this.isGoingThroughPieces(board, move) &&
            this.isOnBoard(move);
    }
    getLegalMoves(board) {
        let moves = [];
        for (let i = 0; i < 8; i++) {
            let move = new Position(this.matrixPosition.x, i);
            if (this.isMoveLegal(board, move)) {
                moves.push(move);
            }
        }
        for (let i = 0; i < 8; i++) {
            let move = new Position(i, this.matrixPosition.y);
            if (this.isMoveLegal(board, move)) {
                moves.push(move);
            }
        }
        let startY = this.matrixPosition.y - this.matrixPosition.x;
        for (let i = 0; i < 8; i++) {
            let move = new Position(i, startY + i);
            if (this.isMoveLegal(board, move)) {
                moves.push(move);
            }
        }
        let startX = this.matrixPosition.x + this.matrixPosition.y;
        for (let i = 0; i < 8; i++) {
            let move = new Position(startX - i, i);
            if (this.isMoveLegal(board, move)) {
                moves.push(move);
            }
        }
        return moves;
    }
}
export { Queen };
