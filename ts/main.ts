import { Globals } from "./globals.js";
import { Elements } from "./elements.js";
import { StandardContext } from "./standardContext.js";
import { Keyboard } from "./keyboard.js";
import { Mouse } from "./mouse.js";
import { Resources } from "./resources.js";

import { Constants } from "./constants.js";
import { State } from "./state.js";

import { GlobalInstances } from "./globalInstances.js";

import { Position } from "./position.js";
import { Board } from "./board.js";


class Main {

    globals: Globals;
    console: Console;
    elements: Elements;
    sctx: StandardContext;
    keyboard: Keyboard;
    mouse: Mouse;
    resources: Resources;

    constants: Constants;
    state: State;

    globalInstances: GlobalInstances;

    board: Board;
    

    constructor() {
        this.globals = new Globals();
        this.console = this.globals.console;
        this.elements = new Elements(this.globals);
        this.sctx = new StandardContext(this.globals, this.elements.canvas);
        this.keyboard = new Keyboard(this.globals);
        this.mouse = new Mouse(this.globals, this.elements.canvas);
        this.resources = new Resources(this.globals);

        this.constants = new Constants();
        this.state = new State();

        this.globalInstances = new GlobalInstances(this.globals, this.elements, this.sctx, this.keyboard, this.mouse, this.resources, this.constants, this.state);

        
        this.board = new Board(this.globalInstances);
    }
    
    init(): void {
        this.globals.init();
        this.elements.init();
        this.sctx.init();this
        this.keyboard.init();
        this.mouse.init();
        this.resources.init();

        this.constants.init();

        this.board.init();

        this.resources.addImage(this.constants.chessBoardPath);
        this.resources.addImage(this.constants.whitePawnPath);
        this.resources.addImage(this.constants.whiteKnightPath);
        this.resources.addImage(this.constants.whiteBishopPath);
        this.resources.addImage(this.constants.whiteRookPath);
        this.resources.addImage(this.constants.whiteQueenPath);
        this.resources.addImage(this.constants.whiteKingPath);
        this.resources.addImage(this.constants.blackPawnPath);
        this.resources.addImage(this.constants.blackKnightPath);
        this.resources.addImage(this.constants.blackBishopPath);
        this.resources.addImage(this.constants.blackRookPath);
        this.resources.addImage(this.constants.blackQueenPath);
        this.resources.addImage(this.constants.blackKingPath);
        this.resources.addImage(this.constants.dotPath);
        this.resources.addImage(this.constants.selectedPath);
        const resourcesPromise: Promise<any> = this.resources.loadResources();
        resourcesPromise
            .then((value: any): void => {
                this.loop();
            }, (value: any): void => {
                
            })
            .catch((error: Error): void => {
                this.globals.console.log(error);
            });
        
    }

    loop(): void {
        this.mouse.update();
        this.sctx.clear();

        this.handleMouse();
        this.board.loop();
        
        this.globals.window.requestAnimationFrame(this.loop.bind(this));
    }

    handleMouse(): void {
        if (this.mouse.leftButtonDown) {
            const mouseMatrixPositionX: number = Math.floor((this.mouse.mouseX / 1000) * 8);
            const mouseMatrixPositionY: number = Math.floor((this.mouse.mouseY / 1000) * 8);
            this.board.handleTileClicked(new Position(mouseMatrixPositionX, mouseMatrixPositionY));
        }
    }

}

const main: Main = new Main();
main.init.bind(main)();