import { Globals } from "./globals.js";
import { Resources } from "./resources.js";
import { StandardContext } from "./standardContext.js";

import { Constants } from "./constants.js";

import { GlobalInstances } from "./globalInstances.js";

import { Position } from "./position.js";
import { Board } from "./board.js";
import { PieceColor } from "./pieceColor.js";

class Piece {
    globals: Globals;
    console: Console;
    resources: Resources;
    sctx: StandardContext;

    constants: Constants;
    
    board: Board;
    matrixPosition: Position;
    canvasPosition: Position;

    valid: boolean;
    color: PieceColor;
    captured: boolean;
    moveCount: number;

    constructor(globalInstances: GlobalInstances, board: Board, position: Position, color: PieceColor, valid: boolean) {
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

    draw(): void {

    }

    attackingOwnColor(position: Position): boolean {
        let pieceAtTilePosition: Piece = this.board.getPieceAtTilePosition(position);
        if (pieceAtTilePosition.valid) {
            return this.board.getPieceAtTilePosition(position).color === this.color;
        }
        return false;
    }

    attackingOppositeColor(position: Position): boolean {
        let pieceAtTilePosition: Piece = this.board.getPieceAtTilePosition(position);
        if (pieceAtTilePosition.valid) {
            if (this.color === PieceColor.WHITE) {
                return pieceAtTilePosition.color === PieceColor.BLACK;
            } else if (this.color === PieceColor.BLACK) {
                return pieceAtTilePosition.color === PieceColor.WHITE;
            } else {
                return false;
            }
        }
        return false;
    }

    goingThroughPieces(position: Position): boolean {
        const distanceX: number = position.x - this.matrixPosition.x
        let stepX: number = distanceX;
        if (stepX !== 0) {
            stepX = stepX / Math.abs(stepX);
        }
        const distanceY: number = position.y - this.matrixPosition.y
        let stepY: number = distanceY;
        if (stepY !== 0) {
            stepY = stepY / Math.abs(stepY);
        }

        let steps: number = Math.max(Math.abs(distanceX), Math.abs(distanceY));
        for (let i: number = 0; i < steps; i++) {
            const piece: Piece = this.board.getPieceAtTilePosition(new Position(this.matrixPosition.x + i * stepX, this.matrixPosition.y + i * stepY));
            if (!piece.valid) {
                return true;
            }
        }

        return false;
    }

    isOnBoard(move: Position): boolean {
        return move.x > -1 && move.x < this.constants.boardMatrixSize && move.y > -1 && move.y < this.constants.boardMatrixSize;
    }

    getLegalMoves(board: Board): Position[] {
        return [new Position(0, 0)] as Position[];
    }
}

export { Piece };