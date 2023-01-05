import { Position } from "./position.js";
import { Piece } from "./piece.js";
class King extends Piece {
    constructor(constants, resources, sctx, position, color) {
        super(constants, resources, sctx, position, color, true);
    }
    draw() {
        let image;
        if (this.color == "white") {
            image = this.resources.getImage(this.constants.whiteKingPath);
        }
        else {
            image = this.resources.getImage(this.constants.blackKingPath);
        }
        this.sctx.drawImage(image, this.canvasPosition.x, this.canvasPosition.y, this.constants.tileSize, this.constants.tileSize);
    }
    isMoveLegal(board, move) {
        return !this.isAttackingAllies(board, move) &&
            this.isOnBoard(move);
    }
    getLegalMoves(board) {
        let moves = [];
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                const move = new Position(this.matrixPosition.x + i, this.matrixPosition.y + j);
                if (this.isMoveLegal(board, move)) {
                    moves.push(move);
                }
            }
        }
        return moves;
    }
}
export { King };
