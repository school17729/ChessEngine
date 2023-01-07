import { Globals } from "./globals.js";
import { Mouse } from "./mouse.js";
import { Resources } from "./resources.js";
import { StandardContext } from "./standardContext.js";

import { Constants } from "./constants.js";
import { State } from "./state.js";

import { GlobalInstances } from "./globalInstances.js";

import { Position } from "./position.js";
import { Move } from "./move.js";
import { MoveType } from "./moveType.js";
import { Piece } from "./piece.js";
import { PieceType } from "./pieceType.js";
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
    globals: Globals;
    console: Console;
    mouse: Mouse;
    resources: Resources;
    sctx: StandardContext;
    

    constants: Constants;
    state: State;

    globalInstances: GlobalInstances;

    boardMatrix: Piece[];
    whitePlayer: Player;
    blackPlayer: Player;
    tileSelected: boolean;
    selectedTile: Position;
    pieceSelected: boolean;
    selectedPiece: Piece;

    constructor(globalInstances: GlobalInstances) {
        this.globals = globalInstances.globals;
        this.console = this.globals.console;
        this.mouse = globalInstances.mouse;
        this.resources = globalInstances.resources;
        this.sctx = globalInstances.sctx;

        this.globalInstances = globalInstances;

        this.constants = globalInstances.constants;
        this.state = globalInstances.state;

        this.boardMatrix = [] as Piece[];
        this.whitePlayer = new Player(this.globalInstances, this, PieceColor.WHITE);
        this.blackPlayer = new Player(this.globalInstances, this, PieceColor.BLACK);
        this.tileSelected = false;
        this.selectedTile = new Position(0, 0);
        this.pieceSelected = false;
        this.selectedPiece = new InvalidPiece(this.globalInstances, this);
    }

    init(): void {
        const playerColor: PieceColor = PieceColor.WHITE;

        if (playerColor === PieceColor.WHITE) {
            this.setupAsWhite();
        }
    }

    loop(): void {
        this.whitePlayer.loop();
        this.blackPlayer.loop();

        this.draw();
    }

    draw(): void {
        const boardImage: HTMLImageElement = this.resources.getImage(this.constants.chessBoardPath);
        this.sctx.drawImage(boardImage, 0, 0, 1000, 1000);

        this.whitePlayer.draw();
        this.blackPlayer.draw();
    }

    setupAsWhite(): void {
        // Populates the board with pieces
        this.boardMatrix.push(new Rook(this.globalInstances, this, new Position(0, 0), PieceColor.BLACK));
        this.boardMatrix.push(new Knight(this.globalInstances, this, new Position(1, 0), PieceColor.BLACK));
        this.boardMatrix.push(new Bishop(this.globalInstances, this, new Position(2, 0), PieceColor.BLACK));
        this.boardMatrix.push(new Queen(this.globalInstances, this, new Position(3, 0), PieceColor.BLACK));
        this.boardMatrix.push(new King(this.globalInstances, this, new Position(4, 0), PieceColor.BLACK));
        this.boardMatrix.push(new Bishop(this.globalInstances, this, new Position(5, 0), PieceColor.BLACK));
        this.boardMatrix.push(new Knight(this.globalInstances, this, new Position(6, 0), PieceColor.BLACK));
        this.boardMatrix.push(new Rook(this.globalInstances, this, new Position(7, 0), PieceColor.BLACK));
        for (let i: number = 0; i < this.constants.boardMatrixSize; i++) {
            this.boardMatrix.push(new Pawn(this.globalInstances, this, new Position(i, 1), PieceColor.BLACK));
        }

        for (let i: number = 0; i < this.constants.boardMatrixSize * (this.constants.boardMatrixSize - 4); i++) {
            this.boardMatrix.push(new InvalidPiece(this.globalInstances, this));
        }

        for (let i: number = 0; i < this.constants.boardMatrixSize; i++) {
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
    updatePlayerPieces(): void {
        this.whitePlayer.boardMatrix = [] as Piece[];
        this.blackPlayer.boardMatrix = [] as Piece[];

        for (let i: number = 0; i < this.boardMatrix.length; i++) {
            if (this.boardMatrix[i].color === PieceColor.WHITE) {
                this.whitePlayer.boardMatrix.push(this.boardMatrix[i]);
            } else {
                this.whitePlayer.boardMatrix.push(new InvalidPiece(this.globalInstances, this));
            }
            if (this.boardMatrix[i].color === PieceColor.BLACK) {
                this.blackPlayer.boardMatrix.push(this.boardMatrix[i]);
            } else {
                this.blackPlayer.boardMatrix.push(new InvalidPiece(this.globalInstances, this));
            }
        }

        this.whitePlayer.updatePieces();
        this.blackPlayer.updatePieces();
    }

    handleTileClicked(position: Position, playerColor: PieceColor): void {
        // this.console.log("this.tileSelected: " + this.tileSelected);
        // this.console.log("this.pieceSelected: " + this.pieceSelected);

        if (playerColor === PieceColor.WHITE) {
            this.whitePlayer.handleTileClicked(position);
        } else if (playerColor === PieceColor.BLACK) {
            this.blackPlayer.handleTileClicked(position);
        }
    }

    movePiece(piecePosition: Position, move: Move): void {
        const piece: Piece = this.getPieceAtTilePosition(piecePosition);
        if (piece.valid) {
            this.setPieceAtTilePosition(piece.matrixPosition, new InvalidPiece(this.globalInstances, this));
            this.setPieceAtTilePosition(move.position, piece);
            this.updatePlayerPieces();
        }
        this.console.log(this.boardMatrix);
    }

    getPieceAtTilePosition(position: Position): Piece {
        if (this.isOnBoard(position)) {
            return this.boardMatrix[position.y * 8 + position.x];
        }
        return new InvalidPiece(this.globalInstances, this);
    }

    setPieceAtTilePosition(position: Position, piece: Piece): void {
        this.boardMatrix[position.y * 8 + position.x] = piece;
    }

    isOnBoard(position: Position): boolean {
        return position.x > -1 && position.x < this.constants.boardMatrixSize && position.y > -1 && position.y < this.constants.boardMatrixSize;
    }
}

export { Board };