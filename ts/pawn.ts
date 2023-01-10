import { GlobalInstances } from "./globalInstances.js";

import { Position } from "./position.js";
import { Move } from "./move.js";
import { Piece } from "./piece.js";
import { PieceType } from "./pieceType.js";
import { PlayerColor } from "./playerColor.js";

class Pawn extends Piece {

    constructor(globalInstances: GlobalInstances, color: PlayerColor, position: Position) {
        super(globalInstances, PieceType.PAWN, color, position, true);
    }

    draw(): void {
        let image: HTMLImageElement;
        if (this.color === PlayerColor.WHITE) {
            image = this.resources.getImage(this.constants.whitePawnPath);
        } else if (this.color === PlayerColor.BLACK) {
            image = this.resources.getImage(this.constants.blackPawnPath);
        } else {
            image = this.resources.getImage("");
        }
        this.sctx.drawImage(image, this.canvasPosition.x, this.canvasPosition.y, this.constants.tileWidth, this.constants.tileHeight);
    }

    move(move: Move): void {
        this.moveBase(move);
    }
}

export { Pawn };