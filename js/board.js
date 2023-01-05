import { Position } from "./position.js";
import { Piece } from "./piece.js";
import { Pawn } from "./pawn.js";
import { Knight } from "./knight.js";
import { Bishop } from "./bishop.js";
import { Rook } from "./rook.js";
import { Queen } from "./queen.js";
import { King } from "./king.js";
class Board {
    constructor(globals, constants, resources, sctx) {
        this.globals = globals;
        this.resources = resources;
        this.sctx = sctx;
        this.constants = constants;
        this.whitePieces = [];
        this.blackPieces = [];
    }
    init() {
        const playerColor = "white";
        if (playerColor === "white") {
            this.setupAsWhite();
        }
    }
    draw() {
        const image = this.resources.getImage(this.constants.chessBoardPath);
        this.sctx.drawImage(image, 0, 0, 1000, 1000);
        for (let i = 0; i < this.whitePieces.length; i++) {
            this.whitePieces[i].draw();
            this.blackPieces[i].draw();
        }
    }
    setupAsWhite() {
        this.whitePieces.push(new Rook(this.constants, this.resources, this.sctx, new Position(0, 7), "white"));
        this.whitePieces.push(new Knight(this.constants, this.resources, this.sctx, new Position(1, 7), "white"));
        this.whitePieces.push(new Bishop(this.constants, this.resources, this.sctx, new Position(2, 7), "white"));
        this.whitePieces.push(new Queen(this.constants, this.resources, this.sctx, new Position(3, 7), "white"));
        this.whitePieces.push(new King(this.constants, this.resources, this.sctx, new Position(4, 7), "white"));
        this.whitePieces.push(new Bishop(this.constants, this.resources, this.sctx, new Position(5, 7), "white"));
        this.whitePieces.push(new Knight(this.constants, this.resources, this.sctx, new Position(6, 7), "white"));
        this.whitePieces.push(new Rook(this.constants, this.resources, this.sctx, new Position(7, 7), "white"));
        for (let i = 0; i < 8; i++) {
            this.whitePieces.push(new Pawn(this.constants, this.resources, this.sctx, new Position(i, 5), "white"));
        }
        this.blackPieces.push(new Rook(this.constants, this.resources, this.sctx, new Position(0, 0), "black"));
        this.blackPieces.push(new Knight(this.constants, this.resources, this.sctx, new Position(1, 0), "black"));
        this.blackPieces.push(new Bishop(this.constants, this.resources, this.sctx, new Position(2, 0), "black"));
        this.blackPieces.push(new Queen(this.constants, this.resources, this.sctx, new Position(3, 0), "black"));
        this.blackPieces.push(new King(this.constants, this.resources, this.sctx, new Position(4, 0), "black"));
        this.blackPieces.push(new Bishop(this.constants, this.resources, this.sctx, new Position(5, 0), "black"));
        this.blackPieces.push(new Knight(this.constants, this.resources, this.sctx, new Position(6, 0), "black"));
        this.blackPieces.push(new Rook(this.constants, this.resources, this.sctx, new Position(7, 0), "black"));
        for (let i = 0; i < 8; i++) {
            this.blackPieces.push(new Pawn(this.constants, this.resources, this.sctx, new Position(i, 1), "black"));
        }
    }
    getPieceAtTilePosition(position) {
        for (let i = 0; i < this.whitePieces.length; i++) {
            if (this.whitePieces[i].matrixPosition.x === position.x && this.whitePieces[i].matrixPosition.y === position.y) {
                return this.whitePieces[i];
            }
        }
        for (let i = 0; i < this.blackPieces.length; i++) {
            if (this.blackPieces[i].matrixPosition.x === position.x && this.blackPieces[i].matrixPosition.y === position.y) {
                return this.blackPieces[i];
            }
        }
        return new Piece(this.constants, this.resources, this.sctx, new Position(0, 0), "white", false);
    }
}
export { Board };
