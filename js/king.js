import { Piece } from "./piece.js";
class King extends Piece {
    constructor(constants, resources, sctx, position, color) {
        super(constants, resources, sctx, position, color);
    }
    draw() {
        let image;
        if (this.color == "white") {
            image = this.resources.getImage(this.constants.whiteKingPath);
        }
        else {
            image = this.resources.getImage(this.constants.blackKingPath);
        }
        this.sctx.drawImage(image, this.canvasPosition.x, this.canvasPosition.y, this.constants.tileSize, this.constants.tileSize);
    }
}
export { King };
