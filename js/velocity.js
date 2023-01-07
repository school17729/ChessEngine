class Velocity {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    multiply(value) {
        return new Velocity(this.x * value, this.y * value);
    }
}
export { Velocity };
