class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    equals(position) {
        return this.x === position.x && this.y === position.y;
    }
    multiply(value) {
        return new Position(this.x * value, this.y * value);
    }
    clone() {
        return new Position(this.x, this.y);
    }
}
export { Position };
