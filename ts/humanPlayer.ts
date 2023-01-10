import { GlobalInstances } from "./globalInstances.js";

import { Position } from "./position.js";
import { Move } from "./move.js";
import { Board } from "./board.js";
import { Player } from "./player.js";
import { PlayerColor } from "./playerColor.js";
import { ControlType } from "./controlType.js";

class HumanPlayer extends Player {

    constructor(globalInstances: GlobalInstances, board: Board, color: PlayerColor) {
        super(globalInstances, board, color, ControlType.HUMAN, true);
    }

    handleTileClicked(position: Position): void {
        if (position.equals(this.board.selectedTile)) {
            if (this.board.tileSelected) {
                this.board.unselectTile();
            } else {
                this.board.selectTile(position);

                if (this.board.turn !== this.board.selectedPiece.color) {
                    this.board.unselectPiece();
                }
            }
        } else {
            if (this.board.pieceSelected && this.board.selectedPiece.color === this.color) {
                const legalMoves: Move[] = this.board.getLegalMoves(this.board.selectedPiece);
                for (let i: number = 0; i < legalMoves.length; i++) {
                    if (position.equals(legalMoves[i].newPosition)) {
                        if (!this.board.selectedPiece.moving) {
                            this.board.movePiece(legalMoves[i]);
                            this.board.unselectTile();
                            this.board.unselectPiece();
                        }
                        return;
                    }
                }
            }
            // The code arrives here if the clicked position couldn't be found in the selected piece's legal moves
            this.board.selectTile(position);

            if (this.board.turn !== this.board.selectedPiece.color) {
                this.board.unselectPiece();
            }
        }
    }
}

export { HumanPlayer };