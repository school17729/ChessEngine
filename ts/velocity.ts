class Velocity {
    
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    equals(velocity: Velocity): boolean {
        return this.x === velocity.x && this.y === velocity.y;
    }

    multiply(value: number): Velocity {
        return new Velocity(this.x * value, this.y * value);
    }

    clone(): Velocity {
        return new Velocity(this.x, this.y);
    }
}

export { Velocity };