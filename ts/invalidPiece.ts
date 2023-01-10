import { GlobalInstances } from "./globalInstances.js";

import { Position } from "./position.js";
import { Move } from "./move.js";
import { Board } from "./board.js";
import { Player } from "./player.js";
import { Piece } from "./piece.js";
import { PieceType } from "./pieceType.js";
import { PlayerColor } from "./playerColor.js";

class InvalidPiece extends Piece {

    constructor(globalInstances: GlobalInstances) {
        super(globalInstances, PieceType.NONE, PlayerColor.NONE, new Position(0, 0), false);
    }

    draw(): void {
        this.console.log("[InvalidPiece]: draw was called on an InvalidPiece.");
    }

    getLegalMoves(): Move[] {
        this.console.log("[InvalidPiece]: getLegalMoves was called on an InvalidPiece.");
        return [] as Move[];
    }

    move(move: Move): void {
        this.console.log("[InvalidPiece]: move was called on an InvalidPiece.");
        this.moveBase(move);
    }
}

export { InvalidPiece };