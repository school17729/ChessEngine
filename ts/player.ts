import { Globals } from "./globals.js";
import { Resources } from "./resources.js";
import { StandardContext } from "./standardContext.js";

import { Constants } from "./constants.js";

import { GlobalInstances } from "./globalInstances.js";

import { Board } from "./board.js";

import { PlayerColor } from "./playerColor.js";
import { ControlType } from "./controlType.js";

class Player {
    globals: Globals;
    resources: Resources;
    sctx: StandardContext;
    globalInstances: GlobalInstances;

    constants: Constants;

    board: Board;

    color: PlayerColor;
    controlType: ControlType;

    valid: boolean;
    
    constructor(globalInstances: GlobalInstances, board: Board, color: PlayerColor, controlType: ControlType, valid: boolean) {
        this.globals = globalInstances.globals;
        this.resources = globalInstances.resources;
        this.sctx = globalInstances.sctx;

        this.globalInstances = globalInstances;

        this.constants = globalInstances.constants;

        this.board = board;

        this.color = color;
        this.controlType = controlType;

        this.valid = valid;
    }

    init(): void {

    }

    loop(): void {
        
    }

    draw(): void {

    }

    
}

export { Player };