class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    multiply(value) {
        return new Position(this.x * value, this.y * value);
    }
}
export { Position };
