class Piece {
    constructor(constants, resources, sctx, position, color) {
        this.resources = resources;
        this.sctx = sctx;
        this.constants = constants;
        this.matrixPosition = position;
        this.canvasPosition = position.multiply(this.constants.tileSize);
        this.color = color;
        this.captured = false;
    }
    draw() { }
}
export { Piece };
