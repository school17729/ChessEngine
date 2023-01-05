import { Piece } from "./piece.js";
class Pawn extends Piece {
    constructor(constants, resources, sctx, position, color) {
        super(constants, resources, sctx, position, color, true);
    }
    draw() {
        let image;
        if (this.color == "white") {
            image = this.resources.getImage(this.constants.whitePawnPath);
        }
        else {
            image = this.resources.getImage(this.constants.blackPawnPath);
        }
        this.sctx.drawImage(image, this.canvasPosition.x, this.canvasPosition.y, this.constants.tileSize, this.constants.tileSize);
    }
}
export { Pawn };
