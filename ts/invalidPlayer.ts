import { GlobalInstances } from "./globalInstances.js";

import { Board } from "./board.js";
import { Player } from "./player.js";
import { PlayerColor } from "./playerColor.js";
import { ControlType } from "./controlType.js";

class InvalidPlayer extends Player {

    constructor(globalInstances: GlobalInstances, board: Board) {
        super(globalInstances, board, PlayerColor.NONE, ControlType.NONE, false);
    }
}

export { InvalidPlayer };