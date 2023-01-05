import { Piece } from "./piece.js";
class Knight extends Piece {
    constructor(constants, resources, sctx, position, color) {
        super(constants, resources, sctx, position, color, true);
    }
    draw() {
        let image;
        if (this.color == "white") {
            image = this.resources.getImage(this.constants.whiteKnightPath);
        }
        else {
            image = this.resources.getImage(this.constants.blackKnightPath);
        }
        this.sctx.drawImage(image, this.canvasPosition.x, this.canvasPosition.y, this.constants.tileSize, this.constants.tileSize);
    }
}
export { Knight };
