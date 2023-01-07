import { Globals } from "./globals.js";
import { Mouse } from "./mouse.js";
import { Resources } from "./resources.js";
import { StandardContext } from "./standardContext.js";

import { Constants } from "./constants.js";
import { State } from "./state.js";

import { GlobalInstances } from "./globalInstances.js";

import { Position } from "./position.js";
import { Move } from "./move.js";
import { Piece } from "./piece.js";
import { PieceColor } from "./pieceColor.js";
import { Pawn } from "./pawn.js";
import { Knight } from "./knight.js";
import { Bishop } from "./bishop.js";
import { Rook } from "./rook.js";
import { Queen } from "./queen.js";
import { King } from "./king.js";
import { InvalidPiece } from "./invalidPiece.js";



class Board {
    globals: Globals;
    console: Console;
    mouse: Mouse;
    resources: Resources;
    sctx: StandardContext;
    

    constants: Constants;
    state: State;

    globalInstances: GlobalInstances;

    whitePieces: Piece[];
    blackPieces: Piece[];
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

        this.whitePieces = [] as Piece[];
        this.blackPieces = [] as Piece[];
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
        for (let i: number = 0; i < this.whitePieces.length; i++) {
            this.whitePieces[i].loop();
        }

        for (let i: number = 0; i < this.blackPieces.length; i++) {
            this.blackPieces[i].loop();
        }

        this.draw();
    }

    draw(): void {
        const boardImage: HTMLImageElement = this.resources.getImage(this.constants.chessBoardPath);
        this.sctx.drawImage(boardImage, 0, 0, 1000, 1000);

        if (this.tileSelected) {
            const selectedImage: HTMLImageElement = this.resources.getImage(this.constants.selectedPath);
            const canvasTilePositionX: number = this.selectedTile.x * this.constants.tileWidth;
            const canvasTilePositionY: number = this.selectedTile.y * this.constants.tileHeight;
            this.sctx.drawImage(selectedImage, canvasTilePositionX, canvasTilePositionY, this.constants.tileWidth, this.constants.tileHeight);
        }

        for (let i: number = 0; i < this.whitePieces.length; i++) {
            this.whitePieces[i].draw();
        }

        for (let i: number = 0; i < this.blackPieces.length; i++) {
            this.blackPieces[i].draw();
        }

        if (this.pieceSelected) {
            const dotImage: HTMLImageElement = this.resources.getImage(this.constants.dotPath);
            const legalMoves: Move[] = this.selectedPiece.getLegalMoves();
            for (let i: number = 0; i < legalMoves.length; i++) {
                const canvasTilePositionX: number = legalMoves[i].position.x * this.constants.tileWidth;
                const canvasTilePositionY: number = legalMoves[i].position.y * this.constants.tileHeight;
                this.sctx.drawImage(dotImage, canvasTilePositionX, canvasTilePositionY, this.constants.tileWidth, this.constants.tileHeight);
            }
        }
    }

    setupAsWhite(): void {
        this.whitePieces.push(new Rook(this.globalInstances, this, new Position(0, 7), PieceColor.WHITE));
        this.whitePieces.push(new Knight(this.globalInstances, this, new Position(1, 7), PieceColor.WHITE));
        this.whitePieces.push(new Bishop(this.globalInstances, this, new Position(2, 7), PieceColor.WHITE));
        this.whitePieces.push(new Queen(this.globalInstances, this, new Position(3, 7), PieceColor.WHITE));
        this.whitePieces.push(new King(this.globalInstances, this, new Position(4, 7), PieceColor.WHITE));
        this.whitePieces.push(new Bishop(this.globalInstances, this, new Position(5, 7), PieceColor.WHITE));
        this.whitePieces.push(new Knight(this.globalInstances, this, new Position(6, 7), PieceColor.WHITE));
        this.whitePieces.push(new Rook(this.globalInstances, this, new Position(7, 7), PieceColor.WHITE));

        for (let i: number = 0; i < this.constants.boardMatrixSize; i++) {
            this.whitePieces.push(new Pawn(this.globalInstances, this, new Position(i, 6), PieceColor.WHITE));
        }

        this.blackPieces.push(new Rook(this.globalInstances, this, new Position(0, 0), PieceColor.BLACK));
        this.blackPieces.push(new Knight(this.globalInstances, this, new Position(1, 0), PieceColor.BLACK));
        this.blackPieces.push(new Bishop(this.globalInstances, this, new Position(2, 0), PieceColor.BLACK));
        this.blackPieces.push(new Queen(this.globalInstances, this, new Position(3, 0), PieceColor.BLACK));
        this.blackPieces.push(new King(this.globalInstances, this, new Position(4, 0), PieceColor.BLACK));
        this.blackPieces.push(new Bishop(this.globalInstances, this, new Position(5, 0), PieceColor.BLACK));
        this.blackPieces.push(new Knight(this.globalInstances, this, new Position(6, 0), PieceColor.BLACK));
        this.blackPieces.push(new Rook(this.globalInstances, this, new Position(7, 0), PieceColor.BLACK));

        for (let i: number = 0; i < this.constants.boardMatrixSize; i++) {
            this.blackPieces.push(new Pawn(this.globalInstances, this, new Position(i, 1), PieceColor.BLACK));
        }

        // this.console.log(this.getPieceAtTilePosition(new Position(0, 7)).getLegalMoves());
        // this.console.log(this.getPieceAtTilePosition(new Position(1, 7)).getLegalMoves());
        // this.console.log(this.getPieceAtTilePosition(new Position(2, 7)).getLegalMoves());
        // this.console.log(this.getPieceAtTilePosition(new Position(3, 7)).getLegalMoves());
        // this.console.log(this.getPieceAtTilePosition(new Position(4, 7)).getLegalMoves());
        // this.console.log(this.getPieceAtTilePosition(new Position(0, 6)).getLegalMoves());
    }

    handleTileClicked(position: Position): void {
        // this.console.log("this.tileSelected: " + this.tileSelected);
        // this.console.log("this.pieceSelected: " + this.pieceSelected);

        if (this.selectedTile.x === position.x && this.selectedTile.y === position.y) {
            this.tileSelected = !this.tileSelected;
            this.pieceSelected = !this.pieceSelected;
            this.selectedPiece = this.getPieceAtTilePosition(this.selectedTile);
        } else {
            if (this.selectedPiece.valid) {
                const legalMoves: Move[] = this.selectedPiece.getLegalMoves();
                for (let i: number = 0; i < legalMoves.length; i++) {
                    if (legalMoves[i].position.x === position.x && legalMoves[i].position.y === position.y) {
                        if (this.pieceSelected) {
                            if (!this.selectedPiece.moving) {
                                this.movePiece(legalMoves[i]);
                                // this.tileSelected = false;
                                // this.selectedTile = legalMoves[i].position;
                                this.tileSelected = false;
                                this.pieceSelected = false;
                            }
                            // if the code reaches here, that means that the user clicked on a legal move while the piece was moving,
                            // and that's not allowed, so there is nothing else to do
                            return;
                        }
                    }
                }
            }
            
            this.tileSelected = true;
            this.selectedTile = position;
            const piece: Piece = this.getPieceAtTilePosition(this.selectedTile);
            if (piece.valid) {
                this.pieceSelected = true;
                this.selectedPiece = piece;
            } else {
                this.pieceSelected = false;
            }
        }
    }

    selectTile(position: Position): void {
        this.tileSelected = true;
        this.selectedTile = position;
        const piece: Piece = this.getPieceAtTilePosition(this.selectedTile);
        if (piece.valid) {
            this.pieceSelected = true;
            this.selectedPiece = piece;
        } else {
            this.pieceSelected = false;
        }
    }

    movePiece(move: Move): void {
        this.selectedPiece.move(move);
    }

    getPieceAtTilePosition(position: Position): Piece {
        for (let i: number = 0; i < this.whitePieces.length; i++) {
            if (this.whitePieces[i].matrixPosition.x === position.x && this.whitePieces[i].matrixPosition.y === position.y) {
                return this.whitePieces[i];
            }
        }
        for (let i: number = 0; i < this.blackPieces.length; i++) {
            if (this.blackPieces[i].matrixPosition.x === position.x && this.blackPieces[i].matrixPosition.y === position.y) {
                return this.blackPieces[i];
            }
        }

        return new InvalidPiece(this.globalInstances, this);
    }
}

export { Board };