import { Player } from "./player.js";
import { PlayerColor } from "./playerColor.js";
import { ControlType } from "./controlType.js";
class InvalidPlayer extends Player {
    constructor(globalInstances, board) {
        super(globalInstances, board, PlayerColor.NONE, ControlType.NONE, false);
    }
}
export { InvalidPlayer };
