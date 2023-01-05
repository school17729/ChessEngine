import { Resources } from "./resources.js";
import { StandardContext } from "./standardContext.js";

import { Constants } from "./constants.js";

import { Position } from "./position.js";
import { Board } from "./board.js";
import { Piece } from "./piece.js";

class Rook extends Piece {

    constructor(constants: Constants, resources: Resources, sctx: StandardContext, position: Position, color: string) {
        super(constants, resources, sctx, position, color, true);
    }

    draw(): void {
        let image: HTMLImageElement;
        if (this.color == "white") {
            image = this.resources.getImage(this.constants.whiteRookPath);
        } else {
            image = this.resources.getImage(this.constants.blackRookPath);
        }
        this.sctx.drawImage(image, this.canvasPosition.x, this.canvasPosition.y, this.constants.tileSize, this.constants.tileSize);
    }

    isMoveLegal(board: Board, move: Position): boolean {
        return !this.isAttackingAllies(board, move) &&
            !this.isGoingThroughPieces(board, move) &&
            this.isOnBoard(move);
    }

    getLegalMoves(board: Board): Position[] {
        let moves: Position[] = [] as Position[];

        for (let i: number = 0; i < 8; i++) {
            let move: Position = new Position(this.matrixPosition.x, i);
            if (this.isMoveLegal(board, move)) {
                moves.push(move);
            }
        }

        for (let i: number = 0; i < 8; i++) {
            let move: Position = new Position(i, this.matrixPosition.y);
            if (this.isMoveLegal(board, move)) {
                moves.push(move);
            }
        }

        return moves;
    }
}

export { Rook };