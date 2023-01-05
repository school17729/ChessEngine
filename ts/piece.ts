import { Resources } from "./resources.js";
import { StandardContext } from "./standardContext.js";

import { Constants } from "./constants.js";

import { Position } from "./position.js";
import { Board } from "./board.js";

class Piece {
    resources: Resources;
    sctx: StandardContext;

    constants: Constants;
    
    matrixPosition: Position;
    canvasPosition: Position;

    valid: boolean;
    color: string;
    captured: boolean;

    constructor(constants: Constants, resources: Resources, sctx: StandardContext, position: Position, color: string, valid: boolean) {
        this.resources = resources;
        this.sctx = sctx;

        this.constants = constants;

        this.matrixPosition = position;
        this.canvasPosition = position.multiply(this.constants.tileSize);

        this.valid = valid;
        this.color = color;
        this.captured = false;
    }

    draw(): void {

    }

    isAttackingAllies(board: Board, position: Position): boolean {
        let pieceAtTilePosition: Piece = board.getPieceAtTilePosition(position);
        if (pieceAtTilePosition.valid) {
            return board.getPieceAtTilePosition(position).color === this.color;
        }
        return false;
    }

    isGoingThroughPieces(board: Board, position: Position): boolean {
        let stepX: number = position.x - this.matrixPosition.x;
        if (stepX !== 0) {
            stepX = (position.x - this.matrixPosition.x) / Math.abs(position.x - this.matrixPosition.x);
        }
        let stepY: number = position.y - this.matrixPosition.y;
        if (stepY !== 0) {
            stepY = (position.y - this.matrixPosition.y) / Math.abs(position.y - this.matrixPosition.y);
        }
        let steps: number = Math.max(Math.abs(position.x - this.matrixPosition.x), Math.abs(position.y - this.matrixPosition.y));
        for (let i: number = 0; i < steps; i++) {
            if (!board.getPieceAtTilePosition(new Position(this.matrixPosition.x + i * stepX, this.matrixPosition.y + i * stepY)).valid) {
                return true;
            }
        }
        return false;
    }

    isMoveLegal(board: Board, move: Position): boolean {
        return false;
    }

    isOnBoard(move: Position): boolean {
        return move.x > -1 && move.x < 8 && move.y > -1 && move.y < 8;
    }

    getLegalMoves(board: Board): Position[] {
        return [new Position(0, 0)] as Position[];
    }
}

export { Piece };