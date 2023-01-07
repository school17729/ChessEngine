class Velocity {
    
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    multiply(value: number): Velocity {
        return new Velocity(this.x * value, this.y * value);
    }
}

export { Velocity };