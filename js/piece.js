import { Position } from "./position.js";
class Piece {
    constructor(constants, resources, sctx, position, color, valid) {
        this.resources = resources;
        this.sctx = sctx;
        this.constants = constants;
        this.matrixPosition = position;
        this.canvasPosition = position.multiply(this.constants.tileSize);
        this.valid = valid;
        this.color = color;
        this.captured = false;
    }
    draw() {
    }
    isAttackingAllies(board, position) {
        let pieceAtTilePosition = board.getPieceAtTilePosition(position);
        if (pieceAtTilePosition.valid) {
            return board.getPieceAtTilePosition(position).color === this.color;
        }
        return false;
    }
    isGoingThroughPieces(board, position) {
        let stepX = position.x - this.matrixPosition.x;
        if (stepX !== 0) {
            stepX = (position.x - this.matrixPosition.x) / Math.abs(position.x - this.matrixPosition.x);
        }
        let stepY = position.y - this.matrixPosition.y;
        if (stepY !== 0) {
            stepY = (position.y - this.matrixPosition.y) / Math.abs(position.y - this.matrixPosition.y);
        }
        let steps = Math.max(Math.abs(position.x - this.matrixPosition.x), Math.abs(position.y - this.matrixPosition.y));
        for (let i = 0; i < steps; i++) {
            if (!board.getPieceAtTilePosition(new Position(this.matrixPosition.x + i * stepX, this.matrixPosition.y + i * stepY)).valid) {
                return true;
            }
        }
        return false;
    }
    isMoveLegal(board, move) {
        return false;
    }
    isOnBoard(move) {
        return move.x > -1 && move.x < 8 && move.y > -1 && move.y < 8;
    }
    getLegalMoves(board) {
        return [new Position(0, 0)];
    }
}
export { Piece };
