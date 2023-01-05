import { Resources } from "./resources.js";
import { StandardContext } from "./standardContext.js";

import { Constants } from "./constants.js";

import { Position } from "./position.js";
import { Board } from "./board.js";
import { Piece } from "./piece.js";

class King extends Piece {

    constructor(constants: Constants, resources: Resources, sctx: StandardContext, position: Position, color: string) {
        super(constants, resources, sctx, position, color, true);
    }

    draw(): void {
        let image: HTMLImageElement;
        if (this.color == "white") {
            image = this.resources.getImage(this.constants.whiteKingPath);
        } else {
            image = this.resources.getImage(this.constants.blackKingPath);
        }
        this.sctx.drawImage(image, this.canvasPosition.x, this.canvasPosition.y, this.constants.tileSize, this.constants.tileSize);
    }

    isMoveLegal(board: Board, move: Position): boolean {
        return !this.isAttackingAllies(board, move) &&
            this.isOnBoard(move);
    }

    getLegalMoves(board: Board): Position[] {
        let moves: Position[] = [] as Position[];

        for (let i: number = -1; i < 2; i++) {
            for (let j: number = -1; j < 2; j++) {
                const move: Position = new Position(this.matrixPosition.x + i, this.matrixPosition.y + j);
                if (this.isMoveLegal(board, move)) {
                    moves.push(move);
                }
            }
        }

        return moves;
    }
}

export { King };