import { Position } from "./position.js";
import { PieceColor } from "./pieceColor.js";
import { Pawn } from "./pawn.js";
import { Knight } from "./knight.js";
import { Bishop } from "./bishop.js";
import { Rook } from "./rook.js";
import { Queen } from "./queen.js";
import { King } from "./king.js";
import { InvalidPiece } from "./invalidPiece.js";
class Board {
    constructor(globalInstances) {
        this.globals = globalInstances.globals;
        this.console = this.globals.console;
        this.resources = globalInstances.resources;
        this.sctx = globalInstances.sctx;
        this.globalInstances = globalInstances;
        this.constants = globalInstances.constants;
        this.whitePieces = [];
        this.blackPieces = [];
    }
    init() {
        const playerColor = PieceColor.WHITE;
        if (playerColor === PieceColor.WHITE) {
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
        this.whitePieces.push(new Rook(this.globalInstances, this, new Position(0, 7), PieceColor.WHITE));
        this.whitePieces.push(new Knight(this.globalInstances, this, new Position(1, 7), PieceColor.WHITE));
        this.whitePieces.push(new Bishop(this.globalInstances, this, new Position(2, 7), PieceColor.WHITE));
        this.whitePieces.push(new Queen(this.globalInstances, this, new Position(3, 7), PieceColor.WHITE));
        this.whitePieces.push(new King(this.globalInstances, this, new Position(4, 7), PieceColor.WHITE));
        this.whitePieces.push(new Bishop(this.globalInstances, this, new Position(5, 7), PieceColor.WHITE));
        this.whitePieces.push(new Knight(this.globalInstances, this, new Position(6, 7), PieceColor.WHITE));
        this.whitePieces.push(new Rook(this.globalInstances, this, new Position(7, 7), PieceColor.WHITE));
        for (let i = 0; i < this.constants.boardMatrixSize; i++) {
            this.whitePieces.push(new Pawn(this.globalInstances, this, new Position(i, 5), PieceColor.WHITE));
        }
        this.blackPieces.push(new Rook(this.globalInstances, this, new Position(0, 0), PieceColor.BLACK));
        this.blackPieces.push(new Knight(this.globalInstances, this, new Position(1, 0), PieceColor.BLACK));
        this.blackPieces.push(new Bishop(this.globalInstances, this, new Position(2, 0), PieceColor.BLACK));
        this.blackPieces.push(new Queen(this.globalInstances, this, new Position(3, 0), PieceColor.BLACK));
        this.blackPieces.push(new King(this.globalInstances, this, new Position(4, 0), PieceColor.BLACK));
        this.blackPieces.push(new Bishop(this.globalInstances, this, new Position(5, 0), PieceColor.BLACK));
        this.blackPieces.push(new Knight(this.globalInstances, this, new Position(6, 0), PieceColor.BLACK));
        this.blackPieces.push(new Rook(this.globalInstances, this, new Position(7, 0), PieceColor.BLACK));
        for (let i = 0; i < this.constants.boardMatrixSize; i++) {
            this.blackPieces.push(new Pawn(this.globalInstances, this, new Position(i, 1), PieceColor.BLACK));
        }
        // this.console.log(this.getPieceAtTilePosition(new Position(0, 7)).getLegalMoves(this));
        // this.console.log(this.getPieceAtTilePosition(new Position(1, 7)).getLegalMoves(this));
        // this.console.log(this.getPieceAtTilePosition(new Position(2, 7)).getLegalMoves(this));
        // this.console.log(this.getPieceAtTilePosition(new Position(3, 7)).getLegalMoves(this));
        // this.console.log(this.getPieceAtTilePosition(new Position(4, 7)).getLegalMoves(this));
        // this.console.log(this.getPieceAtTilePosition(new Position(0, 5)).getLegalMoves(this));
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
        return new InvalidPiece(this.globalInstances, this);
    }
}
export { Board };
