import { Position } from "./position.js";
import { PieceColor } from "./pieceColor.js";
import { Pawn } from "./pawn.js";
import { Knight } from "./knight.js";
import { Bishop } from "./bishop.js";
import { Rook } from "./rook.js";
import { Queen } from "./queen.js";
import { King } from "./king.js";
import { InvalidPiece } from "./invalidPiece.js";
import { Player } from "./player.js";
class Board {
    constructor(globalInstances) {
        this.globals = globalInstances.globals;
        this.console = this.globals.console;
        this.mouse = globalInstances.mouse;
        this.resources = globalInstances.resources;
        this.sctx = globalInstances.sctx;
        this.globalInstances = globalInstances;
        this.constants = globalInstances.constants;
        this.state = globalInstances.state;
        this.boardMatrix = [];
        this.whitePlayer = new Player(this.globalInstances, this, PieceColor.WHITE);
        this.blackPlayer = new Player(this.globalInstances, this, PieceColor.BLACK);
        this.tileSelected = false;
        this.selectedTile = new Position(0, 0);
        this.pieceSelected = false;
        this.selectedPiece = new InvalidPiece(this.globalInstances, this);
    }
    init() {
        const playerColor = PieceColor.WHITE;
        if (playerColor === PieceColor.WHITE) {
            this.setupAsWhite();
        }
    }
    loop() {
        this.whitePlayer.loop();
        this.blackPlayer.loop();
        this.draw();
    }
    draw() {
        const boardImage = this.resources.getImage(this.constants.chessBoardPath);
        this.sctx.drawImage(boardImage, 0, 0, 1000, 1000);
        this.whitePlayer.draw();
        this.blackPlayer.draw();
    }
    setupAsWhite() {
        // Populates the board with pieces
        this.boardMatrix.push(new Rook(this.globalInstances, this, new Position(0, 0), PieceColor.BLACK));
        this.boardMatrix.push(new Knight(this.globalInstances, this, new Position(1, 0), PieceColor.BLACK));
        this.boardMatrix.push(new Bishop(this.globalInstances, this, new Position(2, 0), PieceColor.BLACK));
        this.boardMatrix.push(new Queen(this.globalInstances, this, new Position(3, 0), PieceColor.BLACK));
        this.boardMatrix.push(new King(this.globalInstances, this, new Position(4, 0), PieceColor.BLACK));
        this.boardMatrix.push(new Bishop(this.globalInstances, this, new Position(5, 0), PieceColor.BLACK));
        this.boardMatrix.push(new Knight(this.globalInstances, this, new Position(6, 0), PieceColor.BLACK));
        this.boardMatrix.push(new Rook(this.globalInstances, this, new Position(7, 0), PieceColor.BLACK));
        for (let i = 0; i < this.constants.boardMatrixSize; i++) {
            this.boardMatrix.push(new Pawn(this.globalInstances, this, new Position(i, 1), PieceColor.BLACK));
        }
        for (let i = 0; i < this.constants.boardMatrixSize * (this.constants.boardMatrixSize - 4); i++) {
            this.boardMatrix.push(new InvalidPiece(this.globalInstances, this));
        }
        for (let i = 0; i < this.constants.boardMatrixSize; i++) {
            this.boardMatrix.push(new Pawn(this.globalInstances, this, new Position(i, 6), PieceColor.WHITE));
        }
        this.boardMatrix.push(new Rook(this.globalInstances, this, new Position(0, 7), PieceColor.WHITE));
        this.boardMatrix.push(new Knight(this.globalInstances, this, new Position(1, 7), PieceColor.WHITE));
        this.boardMatrix.push(new Bishop(this.globalInstances, this, new Position(2, 7), PieceColor.WHITE));
        this.boardMatrix.push(new Queen(this.globalInstances, this, new Position(3, 7), PieceColor.WHITE));
        this.boardMatrix.push(new King(this.globalInstances, this, new Position(4, 7), PieceColor.WHITE));
        this.boardMatrix.push(new Bishop(this.globalInstances, this, new Position(5, 7), PieceColor.WHITE));
        this.boardMatrix.push(new Knight(this.globalInstances, this, new Position(6, 7), PieceColor.WHITE));
        this.boardMatrix.push(new Rook(this.globalInstances, this, new Position(7, 7), PieceColor.WHITE));
        this.updatePlayerPieces();
        this.console.log(this.boardMatrix);
    }
    // Updates each player's pieces
    updatePlayerPieces() {
        this.whitePlayer.boardMatrix = [];
        this.blackPlayer.boardMatrix = [];
        for (let i = 0; i < this.boardMatrix.length; i++) {
            if (this.boardMatrix[i].color === PieceColor.WHITE) {
                this.whitePlayer.boardMatrix.push(this.boardMatrix[i]);
            }
            else {
                this.whitePlayer.boardMatrix.push(new InvalidPiece(this.globalInstances, this));
            }
            if (this.boardMatrix[i].color === PieceColor.BLACK) {
                this.blackPlayer.boardMatrix.push(this.boardMatrix[i]);
            }
            else {
                this.blackPlayer.boardMatrix.push(new InvalidPiece(this.globalInstances, this));
            }
        }
        this.whitePlayer.updatePieces();
        this.blackPlayer.updatePieces();
    }
    handleTileClicked(position, playerColor) {
        // this.console.log("this.tileSelected: " + this.tileSelected);
        // this.console.log("this.pieceSelected: " + this.pieceSelected);
        if (playerColor === PieceColor.WHITE) {
            this.whitePlayer.handleTileClicked(position);
        }
        else if (playerColor === PieceColor.BLACK) {
            this.blackPlayer.handleTileClicked(position);
        }
    }
    movePiece(piecePosition, move) {
        const piece = this.getPieceAtTilePosition(piecePosition);
        if (piece.valid) {
            this.setPieceAtTilePosition(piece.matrixPosition, new InvalidPiece(this.globalInstances, this));
            this.setPieceAtTilePosition(move.position, piece);
            this.updatePlayerPieces();
        }
        this.console.log(this.boardMatrix);
    }
    getPieceAtTilePosition(position) {
        if (this.isOnBoard(position)) {
            return this.boardMatrix[position.y * 8 + position.x];
        }
        return new InvalidPiece(this.globalInstances, this);
    }
    setPieceAtTilePosition(position, piece) {
        this.boardMatrix[position.y * 8 + position.x] = piece;
    }
    isOnBoard(position) {
        return position.x > -1 && position.x < this.constants.boardMatrixSize && position.y > -1 && position.y < this.constants.boardMatrixSize;
    }
}
export { Board };
