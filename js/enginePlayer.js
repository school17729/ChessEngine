import { Player } from "./player.js";
import { ControlType } from "./controlType.js";
class EnginePlayer extends Player {
    constructor(globalInstances, board, color) {
        super(globalInstances, board, color, ControlType.HUMAN, true);
    }
}
export { EnginePlayer };
