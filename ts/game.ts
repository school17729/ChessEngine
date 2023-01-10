import { Globals } from "./globals.js";

import { GlobalInstances } from "./globalInstances.js";

import { Position } from "./position.js";
import { Board } from "./board.js";
import { Player } from "./player.js";
import { InvalidPlayer } from "./invalidPlayer.js";
import { PlayerColor } from "./playerColor.js";
import { HumanPlayer } from "./humanPlayer.js";
import { ControlType } from "./controlType.js";

class Game {
    globals: Globals;
    console: Console;

    globalInstances: GlobalInstances;

    board: Board;
    players: Player[];

    constructor(globalInstances: GlobalInstances, players: Player[], board: Board) {
        this.globals = globalInstances.globals;
        this.console = this.globals.console;
        this.globalInstances = globalInstances;

        this.board = board;
        this.players = players;
    }

    init(): void {
        this.board.init();
    }

    loop(): void {
        for (let i: number = 0; i < this.players.length; i++) {
            this.players[i].loop();
        }
        this.board.loop();

        this.board.draw();
    }

    draw(): void {
        this.board.draw();
    }

    getPlayerOfColor(color: PlayerColor): Player {
        for (let i: number = 0; i < this.players.length; i++) {
            if (this.players[i].color === color) {
                return this.players[i];
            }
        }
        return new InvalidPlayer(this.globalInstances, this.board);
    }

    handleTileClicked(position: Position): void {
        const player: Player = this.getPlayerOfColor(this.board.turn);
        if (player.valid) {
            if (player.controlType === ControlType.HUMAN) {
                const humanPlayer: HumanPlayer = player as HumanPlayer;
                humanPlayer.handleTileClicked(position);
            }
        }
        
    }

    clone(): Game {
        return new Game(this.globalInstances, this.players, this.board);
    }

}

export { Game };