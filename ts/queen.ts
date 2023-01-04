import { Resources } from "./resources.js";
import { StandardContext } from "./standardContext.js";

import { Constants } from "./constants.js";

import { Position } from "./position.js";
import { Piece } from "./piece.js";

class Queen extends Piece {

    constructor(constants: Constants, resources: Resources, sctx: StandardContext, position: Position, color: string) {
        super(constants, resources, sctx, position, color);
    }

    draw(): void {
        let image: HTMLImageElement;
        if (this.color == "white") {
            image = this.resources.getImage(this.constants.whiteQueenPath);
        } else {
            image = this.resources.getImage(this.constants.blackQueenPath);
        }
        this.sctx.drawImage(image, this.canvasPosition.x, this.canvasPosition.y, this.constants.tileSize, this.constants.tileSize);
    }
}

export { Queen };