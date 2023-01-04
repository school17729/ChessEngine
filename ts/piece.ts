import { Resources } from "./resources.js";
import { StandardContext } from "./standardContext.js";

import { Constants } from "./constants.js";

import { Position } from "./position.js";

class Piece {
    resources: Resources;
    sctx: StandardContext;

    constants: Constants;
    
    matrixPosition: Position;
    canvasPosition: Position;

    color: string;
    captured: boolean;

    constructor(constants: Constants, resources: Resources, sctx: StandardContext, position: Position, color: string) {
        this.resources = resources;
        this.sctx = sctx;

        this.constants = constants;

        this.matrixPosition = position;
        this.canvasPosition = position.multiply(this.constants.tileSize);

        this.color = color;
        this.captured = false;
    }

    draw(): void {}
}

export { Piece };