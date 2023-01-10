import { Move } from "./move.js";
import { MoveType } from "./moveType.js";
class Capture extends Move {
    constructor(oldPosition, newPosition) {
        super(MoveType.CAPTURE, oldPosition, newPosition);
    }
}
export { Capture };
