import { GlobalInstances } from "./globalInstances.js";

import { Position } from "./position.js";
import { Pass } from "./pass.js";
import { Board } from "./board.js";
import { Player } from "./player.js";
import { Piece } from "./piece.js";
import { PieceType } from "./pieceType.js";
import { PlayerColor } from "./playerColor.js";

class Rook extends Piece {

    constructor(globalInstances: GlobalInstances, color: PlayerColor, position: Position) {
        super(globalInstances, PieceType.ROOK, color, position, true);
    }

    draw(): void {
        let image: HTMLImageElement;
        if (this.color === PlayerColor.WHITE) {
            image = this.resources.getImage(this.constants.whiteRookPath);
        } else if (this.color === PlayerColor.BLACK) {
            image = this.resources.getImage(this.constants.blackRookPath);
        } else {
            image = this.resources.getImage("");
        }
        this.sctx.drawImage(image, this.canvasPosition.x, this.canvasPosition.y, this.constants.tileWidth, this.constants.tileHeight);
    }

    move(move: Pass): void {
        this.moveBase(move);
    }
}

export { Rook };