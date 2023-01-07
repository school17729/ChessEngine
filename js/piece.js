import { Position } from "./position.js";
import { Velocity } from "./velocity.js";
import { Move } from "./move.js";
import { MoveType } from "./moveType.js";
import { PieceColor } from "./pieceColor.js";
class Piece {
    constructor(globalInstances, board, position, type, color, valid) {
        this.globals = globalInstances.globals;
        this.console = this.globals.console;
        this.resources = globalInstances.resources;
        this.sctx = globalInstances.sctx;
        this.constants = globalInstances.constants;
        this.board = board;
        this.matrixPosition = position;
        this.canvasPosition = position.multiply(this.constants.tileSize);
        this.type = type;
        this.color = color;
        this.captured = false;
        this.moveCount = 0;
        this.moving = false;
        this.movingMove = new Move(MoveType.NONE, new Position(0, 0));
        this.movingFrames = 0;
        this.movingVelocity = new Velocity(0, 0);
        this.valid = valid;
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
        for (let i = 1; i < steps; i++) {
            const piece = this.board.getPieceAtTilePosition(new Position(this.matrixPosition.x + i * stepX, this.matrixPosition.y + i * stepY));
            if (piece.valid) {
                return true;
            }
        }
        return false;
    }
    isOnBoard(position) {
        return position.x > -1 && position.x < this.constants.boardMatrixSize && position.y > -1 && position.y < this.constants.boardMatrixSize;
    }
    loop() {
        if (this.constants.smoothPieceMovement) {
            if (this.moving) {
                if (this.movingFrames < this.constants.pieceMoveDuration) {
                    this.canvasPosition = new Position(this.canvasPosition.x + this.movingVelocity.x, this.canvasPosition.y + this.movingVelocity.y);
                    this.movingFrames++;
                }
                else {
                    this.moving = false;
                    this.matrixPosition = this.movingMove.position;
                    this.canvasPosition = this.matrixPosition.multiply(this.constants.tileSize);
                }
            }
        }
    }
    draw() {
    }
    getLegalMoves() {
        return [];
    }
    moveBase(move) {
        if (this.constants.smoothPieceMovement) {
            this.moving = true;
            this.movingMove = move;
            this.movingFrames = 0;
            const stepX = ((this.movingMove.position.x * this.constants.tileSize) - this.canvasPosition.x) / this.constants.pieceMoveDuration;
            const stepY = ((this.movingMove.position.y * this.constants.tileSize) - this.canvasPosition.y) / this.constants.pieceMoveDuration;
            this.movingVelocity = new Velocity(stepX, stepY);
        }
        else {
            this.moving = false;
            this.matrixPosition = move.position;
            this.canvasPosition = this.matrixPosition.multiply(this.constants.tileSize);
        }
        this.moveCount++;
    }
    move(move) {
        this.moveBase(move);
    }
}
export { Piece };
