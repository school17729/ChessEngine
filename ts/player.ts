import { Globals } from "./globals.js";
import { Resources } from "./resources.js";
import { StandardContext } from "./standardContext.js";

import { Constants } from "./constants.js";

import { GlobalInstances } from "./globalInstances.js";

import { Position } from "./position.js";
import { Move } from "./move.js";
import { MoveType } from "./moveType.js";
import { Board } from "./board.js";
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


class Player {
    globals: Globals;
    resources: Resources;
    sctx: StandardContext;
    globalInstances: GlobalInstances;

    constants: Constants;

    board: Board;

    color: PieceColor;

    boardMatrix: Piece[];
    pieces: Piece[];
    pawns: Pawn[];
    knights: Knight[];
    bishops: Bishop[];
    rooks: Rook[];
    queens: Queen[];
    kings: King[];

    tileSelected: boolean;
    selectedTile: Position;
    pieceSelected: boolean;
    selectedPiece: Piece;
    turn: boolean;
    
    constructor(globalInstances: GlobalInstances, board: Board, color: PieceColor) {
        this.globals = globalInstances.globals;
        this.resources = globalInstances.resources;
        this.sctx = globalInstances.sctx;

        this.globalInstances = globalInstances;

        this.constants = globalInstances.constants;

        this.board = board;

        this.color = color;

        this.boardMatrix = [] as Piece[];
        this.pieces = [] as Piece[];
        this.pawns = [] as Pawn[];
        this.knights = [] as Knight[];
        this.bishops = [] as Bishop[];
        this.rooks = [] as Rook[];
        this.queens = [] as Queen[];
        this.kings = [] as King[];

        this.tileSelected = false;
        this.selectedTile = new Position(0, 0);
        this.pieceSelected = false;
        this.selectedPiece = new InvalidPiece(this.globalInstances, this.board);
        this.turn = false;
    }

    init(): void {

    }

    loop(): void {
        for (let i: number = 0; i < this.pieces.length; i++) {
            this.pieces[i].loop();
        }
    }

    draw(): void {

        if (this.tileSelected) {
            const selectedImage: HTMLImageElement = this.resources.getImage(this.constants.selectedPath);
            const canvasTilePositionX: number = this.selectedTile.x * this.constants.tileWidth;
            const canvasTilePositionY: number = this.selectedTile.y * this.constants.tileHeight;
            this.sctx.drawImage(selectedImage, canvasTilePositionX, canvasTilePositionY, this.constants.tileWidth, this.constants.tileHeight);
        }

        if (this.pieceSelected) {
            const dotImage: HTMLImageElement = this.resources.getImage(this.constants.dotPath);
            if (this.selectedPiece.valid) {
                const legalMoves: Move[] = this.selectedPiece.getLegalMoves();
                for (let i: number = 0; i < legalMoves.length; i++) {
                    const canvasTilePositionX: number = legalMoves[i].position.x * this.constants.tileWidth;
                    const canvasTilePositionY: number = legalMoves[i].position.y * this.constants.tileHeight;
                    this.sctx.drawImage(dotImage, canvasTilePositionX, canvasTilePositionY, this.constants.tileWidth, this.constants.tileHeight);
                }
            }
        }

        for (let i: number = 0; i < this.pieces.length; i++) {
            this.pieces[i].draw();
        }
    }

    updatePieces(): void {

        this.pieces = [] as Piece[];
        for (let i: number = 0; i < this.boardMatrix.length; i++) {
            const piece: Piece = this.boardMatrix[i];
            if (piece.valid) {
                this.pieces.push(piece);
            }
        }

        this.pawns = [] as Pawn[];
        this.knights = [] as Knight[];
        this.bishops = [] as Bishop[];
        this.rooks = [] as Rook[];
        this.queens = [] as Queen[];
        this.kings = [] as King[];
        for (let i: number = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].type === PieceType.PAWN) {
                this.pawns.push(this.pieces[i] as Pawn);
            } else if (this.pieces[i].type === PieceType.KNIGHT) {
                this.knights.push(this.pieces[i] as Knight);
            } else if (this.pieces[i].type === PieceType.BISHOP) {
                this.bishops.push(this.pieces[i] as Bishop);
            } else if (this.pieces[i].type === PieceType.ROOK) {
                this.rooks.push(this.pieces[i] as Rook);
            } else if (this.pieces[i].type === PieceType.QUEEN) {
                this.queens.push(this.pieces[i] as Queen);
            } else if (this.pieces[i].type === PieceType.KING) {
                this.kings.push(this.pieces[i] as King);
            }
        }
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

    getPieceAtTilePosition(position: Position): Piece {
        if (this.isOnBoard(position)) {
            return this.boardMatrix[position.y * 8 + position.x];
        }
        return new InvalidPiece(this.globalInstances, this.board);
    }

    isOnBoard(position: Position): boolean {
        return position.x > -1 && position.x < this.constants.boardMatrixSize && position.y > -1 && position.y < this.constants.boardMatrixSize;
    }

    movePiece(move: Move): void {
        this.board.movePiece(this.selectedPiece.matrixPosition, move);
        this.selectedPiece.move(move);
    }
}

export { Player };