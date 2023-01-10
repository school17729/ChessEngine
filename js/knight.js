import { Piece } from "./piece.js";
import { PieceType } from "./pieceType.js";
import { PlayerColor } from "./playerColor.js";
class Knight extends Piece {
    constructor(globalInstances, color, position) {
        super(globalInstances, PieceType.KNIGHT, color, position, true);
    }
    draw() {
        let image;
        if (this.color === PlayerColor.WHITE) {
            image = this.resources.getImage(this.constants.whiteKnightPath);
        }
        else if (this.color === PlayerColor.BLACK) {
            image = this.resources.getImage(this.constants.blackKnightPath);
        }
        else {
            image = this.resources.getImage("");
        }
        this.sctx.drawImage(image, this.canvasPosition.x, this.canvasPosition.y, this.constants.tileWidth, this.constants.tileHeight);
    }
    move(move) {
        this.moveBase(move);
    }
}
export { Knight };
