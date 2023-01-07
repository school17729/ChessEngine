import { GlobalInstances } from "./globalInstances.js";

import { Position } from "./position.js";
import { Move } from "./move.js";
import { MoveType } from "./moveType.js";
import { Board } from "./board.js";
import { Piece } from "./piece.js";
import { PieceType } from "./pieceType.js";
import { PieceColor } from "./pieceColor.js";

class Queen extends Piece {

    constructor(globalInstances: GlobalInstances, board: Board, position: Position, color: PieceColor) {
        super(globalInstances, board, position, PieceType.QUEEN, color, true);
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

    getLegalMoves(): Move[] {
        let moves: Move[] = [] as Move[];

        for (let i: number = 0; i < this.constants.boardMatrixSize; i++) {
            let movePosition: Position = new Position(this.matrixPosition.x, i);
            if (
                !this.attackingOwnColor(movePosition) &&
                !this.goingThroughPieces(movePosition) &&
                this.isOnBoard(movePosition)
            ) {
                moves.push(new Move(MoveType.MOVE, movePosition));
            }
        }

        for (let i: number = 0; i < this.constants.boardMatrixSize; i++) {
            let movePosition: Position = new Position(i, this.matrixPosition.y);
            if (
                !this.attackingOwnColor(movePosition) &&
                !this.goingThroughPieces(movePosition) &&
                this.isOnBoard(movePosition)
            ) {
                moves.push(new Move(MoveType.MOVE, movePosition));
            }
        }

        let startY: number = this.matrixPosition.y - this.matrixPosition.x;
        for (let i: number = 0; i < this.constants.boardMatrixSize; i++) {
            let movePosition: Position = new Position(i, startY + i);
            if (
                !this.attackingOwnColor(movePosition) &&
                !this.goingThroughPieces(movePosition) &&
                this.isOnBoard(movePosition)
            ) {
                moves.push(new Move(MoveType.MOVE, movePosition));
            }
        }

        let startX: number = this.matrixPosition.x + this.matrixPosition.y;
        for (let i: number = 0; i < this.constants.boardMatrixSize; i++) {
            let movePosition: Position = new Position(startX - i, i);
            if (
                !this.attackingOwnColor(movePosition) &&
                !this.goingThroughPieces(movePosition) &&
                this.isOnBoard(movePosition)
            ) {
                moves.push(new Move(MoveType.MOVE, movePosition));
            }
        }

        return moves;
    }

    move(move: Move): void {
        this.moveBase(move);
    }
}

export { Queen };