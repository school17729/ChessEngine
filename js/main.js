import { Globals } from "./globals.js";
import { Elements } from "./elements.js";
import { StandardContext } from "./standardContext.js";
import { Keyboard } from "./keyboard.js";
import { Mouse } from "./mouse.js";
import { Resources } from "./resources.js";
import { Constants } from "./constants.js";
import { Board } from "./board.js";
class Main {
    constructor() {
        this.globals = new Globals();
        this.elements = new Elements(this.globals);
        this.sctx = new StandardContext(this.globals, this.elements.canvas);
        this.keyboard = new Keyboard(this.globals);
        this.mouse = new Mouse(this.globals, this.elements.canvas);
        this.resources = new Resources(this.globals);
        this.constants = new Constants();
        this.board = new Board(this.constants, this.resources, this.sctx);
    }
    init() {
        this.globals.init();
        this.elements.init();
        this.sctx.init();
        this;
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
        const resourcesPromise = this.resources.loadResources();
        resourcesPromise
            .then((value) => {
            this.loop();
        }, (value) => {
        })
            .catch((error) => {
            this.globals.console.log(error);
        });
    }
    loop() {
        this.sctx.clear();
        const tileSize = 1000 / 8;
        // for (let i: number = 0; i < 8; i++) {
        //     for (let j: number = 0; j < 8; j++) {
        //         let color: string;
        //         if ((i + j) % 2 == 0) {
        //             color = "rgb(255, 255, 255)";
        //         } else {
        //             color = "rgb(0, 0, 0)";
        //         }
        //         this.sctx.fillRect(i  *TILE_SIZE, j * TILE_SIZE, TILE_SIZE, TILE_SIZE, color);
        //     }
        // }
        // const chessBoard: HTMLImageElement = this.resources.getImage("./res/chessBoard.png");
        const dot = this.resources.getImage(this.constants.dotPath);
        // this.sctx.drawImage(chessBoard, 0, 0, 1000, 1000);
        this.board.draw();
        this.sctx.drawImage(dot, 0, tileSize * 2, tileSize, tileSize);
        // this.sctx.fillText(("mouseX: " + this.mouse.mouseX), 100, 100, "rgb(0, 0, 0)", "50px Arial");
        // this.sctx.fillText(("mouseY: " + this.mouse.mouseY), 100, 200, "rgb(0, 0, 0)", "50px Arial");
        this.globals.window.requestAnimationFrame(this.loop.bind(this));
    }
}
const main = new Main();
main.init.bind(main)();
