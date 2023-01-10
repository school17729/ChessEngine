class Velocity {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    equals(velocity) {
        return this.x === velocity.x && this.y === velocity.y;
    }
    multiply(value) {
        return new Velocity(this.x * value, this.y * value);
    }
    clone() {
        return new Velocity(this.x, this.y);
    }
}
export { Velocity };
