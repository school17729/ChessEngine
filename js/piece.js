import { Position } from "./position.js";
import { PieceColor } from "./pieceColor.js";
class Piece {
    constructor(globalInstances, board, position, color, valid) {
        this.globals = globalInstances.globals;
        this.console = this.globals.console;
        this.resources = globalInstances.resources;
        this.sctx = globalInstances.sctx;
        this.constants = globalInstances.constants;
        this.board = board;
        this.matrixPosition = position;
        this.canvasPosition = position.multiply(this.constants.tileSize);
        this.valid = valid;
        this.color = color;
        this.captured = false;
        this.moveCount = 0;
    }
    draw() {
    }
    attackingOwnColor(position) {
        let pieceAtTilePosition = this.board.getPieceAtTilePosition(position);
        if (pieceAtTilePosition.valid) {
            return this.board.getPieceAtTilePosition(position).color === this.color;
        }
        return false;
    }
    attackingOppositeColor(position) {
        let pieceAtTilePosition = this.board.getPieceAtTilePosition(position);
        if (pieceAtTilePosition.valid) {
            if (this.color === PieceColor.WHITE) {
                return pieceAtTilePosition.color === PieceColor.BLACK;
            }
            else if (this.color === PieceColor.BLACK) {
                return pieceAtTilePosition.color === PieceColor.WHITE;
            }
            else {
                return false;
            }
        }
        return false;
    }
    goingThroughPieces(position) {
        const distanceX = position.x - this.matrixPosition.x;
        let stepX = distanceX;
        if (stepX !== 0) {
            stepX = stepX / Math.abs(stepX);
        }
        const distanceY = position.y - this.matrixPosition.y;
        let stepY = distanceY;
        if (stepY !== 0) {
            stepY = stepY / Math.abs(stepY);
        }
        let steps = Math.max(Math.abs(distanceX), Math.abs(distanceY));
        for (let i = 0; i < steps; i++) {
            const piece = this.board.getPieceAtTilePosition(new Position(this.matrixPosition.x + i * stepX, this.matrixPosition.y + i * stepY));
            if (!piece.valid) {
                return true;
            }
        }
        return false;
    }
    isOnBoard(move) {
        return move.x > -1 && move.x < this.constants.boardMatrixSize && move.y > -1 && move.y < this.constants.boardMatrixSize;
    }
    getLegalMoves(board) {
        return [new Position(0, 0)];
    }
}
export { Piece };
