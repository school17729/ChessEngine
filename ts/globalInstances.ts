import { Globals } from "./globals.js";
import { Elements } from "./elements.js";
import { StandardContext } from "./standardContext.js";
import { Keyboard } from "./keyboard.js";
import { Mouse } from "./mouse.js";
import { Resources } from "./resources.js";

import { Constants } from "./constants.js";
import { State } from "./state.js";

class GlobalInstances {

    globals: Globals;
    elements: Elements;
    sctx: StandardContext;
    keyboard: Keyboard;
    mouse: Mouse;
    resources: Resources;

    constants: Constants;
    state: State;

    constructor(globals: Globals, elements: Elements, sctx: StandardContext, keyboard: Keyboard, mouse: Mouse, resources: Resources, constants: Constants, state: State) {
        this.globals = globals;
        this.elements = elements;
        this.sctx = sctx;
        this.keyboard = keyboard;
        this.mouse = mouse;
        this.resources = resources;

        this.constants = constants;
        this.state = state;
    }

    init(): void {
        
    }
}

export { GlobalInstances };