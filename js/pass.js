import { Move } from "./move.js";
import { MoveType } from "./moveType.js";
class Pass extends Move {
    constructor(oldPosition, newPosition) {
        super(MoveType.PASS, oldPosition, newPosition);
    }
}
export { Pass };
