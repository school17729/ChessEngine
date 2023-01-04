import { Piece } from "./piece.js";
class Bishop extends Piece {
    constructor(constants, resources, sctx, position, color) {
        super(constants, resources, sctx, position, color);
    }
    draw() {
        let image;
        if (this.color == "white") {
            image = this.resources.getImage(this.constants.whiteBishopPath);
        }
        else {
            image = this.resources.getImage(this.constants.blackBishopPath);
        }
        this.sctx.drawImage(image, this.canvasPosition.x, this.canvasPosition.y, this.constants.tileSize, this.constants.tileSize);
    }
}
export { Bishop };
