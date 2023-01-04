class Position {
    
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    multiply(value: number): Position {
        return new Position(this.x * value, this.y * value);
    }
}

export { Position };