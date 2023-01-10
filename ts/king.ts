import { GlobalInstances } from "./globalInstances.js";

import { Position } from "./position.js";
import { Move } from "./move.js";
import { Castle } from "./castle.js";
import { Piece } from "./piece.js";
import { PieceType } from "./pieceType.js";
import { PlayerColor } from "./playerColor.js";
import { Rook } from "./rook.js";

class King extends Piece {

    constructor(globalInstances: GlobalInstances, color: PlayerColor, position: Position) {
        super(globalInstances, PieceType.KING, color, position, true);
    }

    draw(): void {
        let image: HTMLImageElement;
        if (this.color === PlayerColor.WHITE) {
            image = this.resources.getImage(this.constants.whiteKingPath);
        } else if (this.color === PlayerColor.BLACK) {
            image = this.resources.getImage(this.constants.blackKingPath);
        } else {
            image = this.resources.getImage("");
        }
        this.sctx.drawImage(image, this.canvasPosition.x, this.canvasPosition.y, this.constants.tileWidth, this.constants.tileHeight);
    }

    move(move: Move): void {
        this.moveBase(move);
    }
}

export { King };