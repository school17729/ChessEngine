import { GlobalInstances } from "./globalInstances.js";

import { Position } from "./position.js";
import { Board } from "./board.js";
import { Piece } from "./piece.js";
import { PieceColor } from "./pieceColor.js";

class Queen extends Piece {

    constructor(globalInstances: GlobalInstances, board: Board, position: Position, color: PieceColor) {
        super(globalInstances, board, position, color, true);
    }

    draw(): void {
        let image: HTMLImageElement;
        if (this.color === PieceColor.WHITE) {
            image = this.resources.getImage(this.constants.whiteQueenPath);
        } else if (this.color === PieceColor.BLACK) {
            image = this.resources.getImage(this.constants.blackQueenPath);
        } else {
            image = this.resources.getImage("");
        }
        this.sctx.drawImage(image, this.canvasPosition.x, this.canvasPosition.y, this.constants.tileWidth, this.constants.tileHeight);
    }

    getLegalMoves(): Position[] {
        let moves: Position[] = [] as Position[];

        for (let i: number = 0; i < this.constants.boardMatrixSize; i++) {
            let move: Position = new Position(this.matrixPosition.x, i);
            if (
                !this.attackingOwnColor(move) &&
                !this.goingThroughPieces(move) &&
                this.isOnBoard(move)
            ) {
                moves.push(move);
            }
        }

        for (let i: number = 0; i < this.constants.boardMatrixSize; i++) {
            let move: Position = new Position(i, this.matrixPosition.y);
            if (
                !this.attackingOwnColor(move) &&
                !this.goingThroughPieces(move) &&
                this.isOnBoard(move)
            ) {
                moves.push(move);
            }
        }

        let startY: number = this.matrixPosition.y - this.matrixPosition.x;
        for (let i: number = 0; i < this.constants.boardMatrixSize; i++) {
            let move: Position = new Position(i, startY + i);
            if (
                !this.attackingOwnColor(move) &&
                !this.goingThroughPieces(move) &&
                this.isOnBoard(move)
            ) {
                moves.push(move);
            }
        }

        let startX: number = this.matrixPosition.x + this.matrixPosition.y;
        for (let i: number = 0; i < this.constants.boardMatrixSize; i++) {
            let move: Position = new Position(startX - i, i);
            if (
                !this.attackingOwnColor(move) &&
                !this.goingThroughPieces(move) &&
                this.isOnBoard(move)
            ) {
                moves.push(move);
            }
        }

        return moves;
    }
}

export { Queen };