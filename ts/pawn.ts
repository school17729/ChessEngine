import { GlobalInstances } from "./globalInstances.js";

import { Position } from "./position.js";
import { Board } from "./board.js";
import { Piece } from "./piece.js";
import { PieceColor } from "./pieceColor.js";

class Pawn extends Piece {

    movedForwardTwoTiles: boolean;

    constructor(globalInstances: GlobalInstances, board: Board, position: Position, color: PieceColor) {
        super(globalInstances, board, position, color, true);

        this.movedForwardTwoTiles = false;
    }

    draw(): void {
        let image: HTMLImageElement;
        if (this.color === PieceColor.WHITE) {
            image = this.resources.getImage(this.constants.whitePawnPath);
        } else if (this.color === PieceColor.BLACK) {
            image = this.resources.getImage(this.constants.blackPawnPath);
        } else {
            image = this.resources.getImage("");
        }
        this.sctx.drawImage(image, this.canvasPosition.x, this.canvasPosition.y, this.constants.tileWidth, this.constants.tileHeight);
    }

    getLegalMoves(): Position[] {
        let moves: Position[] = [] as Position[];
        let move: Position;

        for (let i: number = -1; i < 2; i += 2) {
            let move: Position;
            if (this.color === PieceColor.WHITE) {
                move = new Position(this.matrixPosition.x + i, this.matrixPosition.y - 1);
            } else if (this.color === PieceColor.BLACK) {
                move = new Position(this.matrixPosition.x + i, this.matrixPosition.y + 1);
            } else {
                move = new Position(0, 0);
            }
            if (
                this.attackingOppositeColor(move) &&
                this.isOnBoard(move)
            ) {
                moves.push(move);
            }
        }

        if (this.color === PieceColor.WHITE) {
            move = new Position(this.matrixPosition.x, this.matrixPosition.y - 1);
        } else if (this.color === PieceColor.BLACK) {
            move = new Position(this.matrixPosition.x, this.matrixPosition.y + 1);
        } else {
            move = new Position(0, 0);
        }
        if (
            !this.attackingOwnColor(move) &&
            this.isOnBoard(move)
        ) {
            moves.push(move);
        }

        if (this.moveCount === 0) {
            if (this.color === PieceColor.WHITE) {
                move = new Position(this.matrixPosition.x, this.matrixPosition.y - 2);
            } else if (this.color === PieceColor.BLACK) {
                move = new Position(this.matrixPosition.x, this.matrixPosition.y + 2);
            } else {
                move = new Position(0, 0);
            }
        }
        if (
            !this.attackingOwnColor(move) &&
            this.isOnBoard(move)
        ) {
            moves.push(move);
        }

        return moves;
    }
}

export { Pawn };