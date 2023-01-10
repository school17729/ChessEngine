import { GlobalInstances } from "./globalInstances.js";

import { Board } from "./board.js";
import { Player } from "./player.js";
import { PlayerColor } from "./playerColor.js";
import { ControlType } from "./controlType.js";

class EnginePlayer extends Player {

    constructor(globalInstances: GlobalInstances, board: Board, color: PlayerColor) {
        super(globalInstances, board, color, ControlType.HUMAN, true);
    }
}

export { EnginePlayer };