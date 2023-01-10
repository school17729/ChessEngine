import { InvalidPlayer } from "./invalidPlayer.js";
import { ControlType } from "./controlType.js";
class Game {
    constructor(globalInstances, players, board) {
        this.globals = globalInstances.globals;
        this.console = this.globals.console;
        this.globalInstances = globalInstances;
        this.board = board;
        this.players = players;
    }
    init() {
        this.board.init();
    }
    loop() {
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].loop();
        }
        this.board.loop();
        this.board.draw();
    }
    draw() {
        this.board.draw();
    }
    getPlayerOfColor(color) {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].color === color) {
                return this.players[i];
            }
        }
        return new InvalidPlayer(this.globalInstances, this.board);
    }
    handleTileClicked(position) {
        const player = this.getPlayerOfColor(this.board.turn);
        if (player.valid) {
            if (player.controlType === ControlType.HUMAN) {
                const humanPlayer = player;
                humanPlayer.handleTileClicked(position);
            }
        }
    }
    clone() {
        return new Game(this.globalInstances, this.players, this.board);
    }
}
export { Game };
