import { Globals } from "./globals.js";
import { Mouse } from "./mouse.js";
import { Resources } from "./resources.js";
import { StandardContext } from "./standardContext.js";

import { Constants } from "./constants.js";
import { State } from "./state.js";

import { GlobalInstances } from "./globalInstances.js";

import { Position } from "./position.js";
import { Move } from "./move.js";
import { Pass } from "./pass.js";
import { Castle } from "./castle.js";
import { Piece } from "./piece.js";
import { PieceType } from "./pieceType.js";
import { PlayerColor } from "./playerColor.js";
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

    boardMatrix: Piece[];

    tileSelected: boolean;
    selectedTile: Position;
    pieceSelected: boolean;
    selectedPiece: Piece;

    turn: PlayerColor;

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

        this.tileSelected = false;
        this.selectedTile = new Position(0, 0);
        this.pieceSelected = false;
        this.selectedPiece = new InvalidPiece(this.globalInstances);

        this.turn = PlayerColor.WHITE;
    }

    init(): void {
        this.boardMatrix.push(new Rook(this.globalInstances, PlayerColor.BLACK, new Position(0, 0)));
        this.boardMatrix.push(new Knight(this.globalInstances, PlayerColor.BLACK, new Position(1, 0)));
        this.boardMatrix.push(new Bishop(this.globalInstances, PlayerColor.BLACK, new Position(2, 0)));
        this.boardMatrix.push(new Queen(this.globalInstances, PlayerColor.BLACK, new Position(3, 0)));
        this.boardMatrix.push(new King(this.globalInstances, PlayerColor.BLACK, new Position(4, 0)));
        this.boardMatrix.push(new Bishop(this.globalInstances, PlayerColor.BLACK, new Position(5, 0)));
        this.boardMatrix.push(new Knight(this.globalInstances, PlayerColor.BLACK, new Position(6, 0)));
        this.boardMatrix.push(new Rook(this.globalInstances, PlayerColor.BLACK, new Position(7, 0)));
        for (let i: number = 0; i < this.constants.boardMatrixSize; i++) {
            this.boardMatrix.push(new Pawn(this.globalInstances, PlayerColor.BLACK, new Position(i, 1)));
        }

        for (let i: number = 0; i < this.constants.boardMatrixSize * (this.constants.boardMatrixSize - 4); i++) {
            this.boardMatrix.push(new InvalidPiece(this.globalInstances));
        }

        for (let i: number = 0; i < this.constants.boardMatrixSize; i++) {
            this.boardMatrix.push(new Pawn(this.globalInstances, PlayerColor.WHITE, new Position(i, 6)));
        }
        this.boardMatrix.push(new Rook(this.globalInstances, PlayerColor.WHITE, new Position(0, 7)));
        this.boardMatrix.push(new Knight(this.globalInstances, PlayerColor.WHITE, new Position(1, 7)));
        this.boardMatrix.push(new Bishop(this.globalInstances, PlayerColor.WHITE, new Position(2, 7)));
        this.boardMatrix.push(new Queen(this.globalInstances, PlayerColor.WHITE, new Position(3, 7)));
        this.boardMatrix.push(new King(this.globalInstances, PlayerColor.WHITE, new Position(4, 7)));
        this.boardMatrix.push(new Bishop(this.globalInstances, PlayerColor.WHITE, new Position(5, 7)));
        this.boardMatrix.push(new Knight(this.globalInstances, PlayerColor.WHITE, new Position(6, 7)));
        this.boardMatrix.push(new Rook(this.globalInstances, PlayerColor.WHITE, new Position(7, 7)));
    }

    loop(): void {
        const pieces: Piece[] = this.getPieces();
        for (let i: number = 0; i < pieces.length; i++) {
            pieces[i].loop();
        }

        this.draw();
        for (let i: number = 0; i < pieces.length; i++) {
            pieces[i].draw();
        }
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

        if (this.pieceSelected) {
            const dotImage: HTMLImageElement = this.resources.getImage(this.constants.dotPath);
            if (this.selectedPiece.valid) {
                const legalMoves: Move[] = this.getLegalMoves(this.selectedPiece);
                for (let i: number = 0; i < legalMoves.length; i++) {
                    const canvasTilePositionX: number = legalMoves[i].newPosition.x * this.constants.tileWidth;
                    const canvasTilePositionY: number = legalMoves[i].newPosition.y * this.constants.tileHeight;
                    this.sctx.drawImage(dotImage, canvasTilePositionX, canvasTilePositionY, this.constants.tileWidth, this.constants.tileHeight);
                }
            }
        }

        const pieces: Piece[] = this.getPieces();
        for (let i: number = 0; i < pieces.length; i++) {
            pieces[i].draw();
        }
    }

    selectTile(position: Position): void {
        this.tileSelected = true;
        this.selectedTile = position;

        const piece: Piece = this.getPieceAtTilePosition(this.selectedTile);
        if (piece.valid) {
            this.selectPiece(piece);
        } else {
            this.unselectPiece();
        }
    }

    unselectTile(): void {
        this.tileSelected = false;
        this.selectedTile = new Position(0, 0);

        const piece: Piece = this.getPieceAtTilePosition(this.selectedTile);
        if (piece.valid) {
            this.unselectPiece();
        }
    }

    selectPiece(piece: Piece): void {
        this.pieceSelected = true;
        this.selectedPiece = piece;
    }

    unselectPiece(): void {
        this.pieceSelected = false;
        this.selectedPiece = new InvalidPiece(this.globalInstances);
    }

    movePiece(move: Move): void {
        const piece: Piece = this.getPieceAtTilePosition(move.oldPosition);

        if (piece.valid) {
            this.setPieceAtTilePosition(piece.position, new InvalidPiece(this.globalInstances));
            this.setPieceAtTilePosition(move.newPosition, piece);
            piece.move(move);
        }

        this.console.log(this.boardMatrix);

        if (this.turn === PlayerColor.WHITE) {
            this.turn = PlayerColor.BLACK;
        } else if (this.turn === PlayerColor.BLACK) {
            this.turn = PlayerColor.WHITE;
        }
    }

    getPieceAtTilePosition(position: Position): Piece {
        const invalidPiece: Piece =  new InvalidPiece(this.globalInstances);

        if (this.isOnBoard(position)) {
            return this.boardMatrix[position.y * 8 + position.x];
        }
        return invalidPiece;
    }

    setPieceAtTilePosition(position: Position, piece: Piece): void {
        this.boardMatrix[position.y * 8 + position.x] = piece;
    }

    getPieces(): Piece[] {
        const pieces: Piece[] = [] as Piece[];
        for (let i: number = 0; i < this.boardMatrix.length; i++) {
            if (this.boardMatrix[i].valid) {
                pieces.push(this.boardMatrix[i]);
            }
        }
        return pieces;
    }

    filterPiecesToType(pieces: Piece[], type: PieceType): Piece[] {
        const filteredPieces: Piece[] = [] as Piece[];
        for (let i: number = 0; i < pieces.length; i++) {
            if (pieces[i].valid) {
                if (pieces[i].type === type) {
                    filteredPieces.push(pieces[i]);
                }
            }
        }
        return filteredPieces;
    }

    filterPiecesToColor(pieces: Piece[], color: PlayerColor): Piece[] {
        const filteredPieces: Piece[] = [] as Piece[];
        for (let i: number = 0; i < pieces.length; i++) {
            if (pieces[i].valid) {
                if (pieces[i].color === color) {
                    filteredPieces.push(pieces[i]);
                }
            }
        }
        return filteredPieces;
    }

    getLegalMoves(piece: Piece): Move[] {
        let legalMoves: Move[] = [] as Move[];

        if (piece.type === PieceType.PAWN) {
            legalMoves = this.getLegalPawnMoves(piece);
        } else if (piece.type === PieceType.KNIGHT) {
            legalMoves = this.getLegalKnightMoves(piece);
        } else if (piece.type === PieceType.BISHOP) {
            legalMoves = this.getLegalBishopMoves(piece);
        } else if (piece.type === PieceType.QUEEN) {
            legalMoves = this.getLegalQueenMoves(piece);
        } else if (piece.type === PieceType.KING) {
            legalMoves = this.getLegalKingMoves(piece);
        }
        
        return legalMoves;
    }

    getLegalPawnMoves(piece: Piece): Move[] {
        const moves: Move[] = [] as Move[];
        let newPosition: Position;

        for (let i: number = -1; i < 2; i += 2) {
            let newPosition: Position;
            if (piece.color === PlayerColor.WHITE) {
                newPosition = new Position(piece.position.x + i, piece.position.y - 1);
            } else if (piece.color === PlayerColor.BLACK) {
                newPosition = new Position(piece.position.x + i, piece.position.y + 1);
            } else {
                newPosition = new Position(0, 0);
            }
            if (
                this.attackingOppositeColor(piece, newPosition) &&
                this.isOnBoard(newPosition)
            ) {
                moves.push(new Pass(piece.position, newPosition));
            }
        }

        if (piece.color === PlayerColor.WHITE) {
            newPosition = new Position(piece.position.x, piece.position.y - 1);
        } else if (piece.color === PlayerColor.BLACK) {
            newPosition = new Position(piece.position.x, piece.position.y + 1);
        } else {
            newPosition = new Position(0, 0);
        }
        if (
            !this.attackingOwnColor(piece, newPosition) &&
            !this.attackingOppositeColor(piece, newPosition) &&
            this.isOnBoard(newPosition)
        ) {
            moves.push(new Pass(piece.position, newPosition));
        }

        if (piece.moveCount === 0) {
            if (piece.color === PlayerColor.WHITE) {
                newPosition = new Position(piece.position.x, piece.position.y - 2);
            } else if (piece.color === PlayerColor.BLACK) {
                newPosition = new Position(piece.position.x, piece.position.y + 2);
            } else {
                newPosition = new Position(0, 0);
            }
        }
        if (
            !this.attackingOwnColor(piece, newPosition) &&
            !this.attackingOppositeColor(piece, newPosition) &&
            !this.goingThroughPieces(piece, newPosition) &&
            this.isOnBoard(newPosition)
        ) {
            moves.push(new Pass(piece.position, newPosition));
        }

        return moves;
    }

    getPossibleKnightMoves(piece: Piece): Move[] {
        const moves: Pass[] = [] as Pass[];

        for (let i: number = -1; i < 2; i += 2) {
            for (let j: number = -2; j < 3; j += 4) {
                const newPosition: Position = new Position(piece.position.x + i, piece.position.y + j);
                moves.push(new Pass(piece.position, newPosition));
            }
        }

        for (let i: number = -2; i < 3; i += 4) {
            for (let j: number = -1; j < 2; j += 2) {
                const movePosition: Position = new Position(piece.position.x + i, piece.position.y + j);
                moves.push(new Pass(piece.position, movePosition));
            }
        }

        return moves;
    }

    getLegalKnightMoves(piece: Piece): Move[] {
        const moves: Move[] = [] as Move[];
        const possibleMoves: Move[] = this.getPossibleKnightMoves(piece);

        for (let i: number = 0; i < possibleMoves.length; i++) {
            if (
                !this.attackingOwnColor(piece, possibleMoves[i].newPosition) &&
                this.isOnBoard(possibleMoves[i].newPosition)
            ) {
                moves.push(possibleMoves[i]);
            }
        }
        
        return moves;
    }

    getPossibleBishopMoves(piece: Piece): Move[] {
        const moves: Pass[] = [] as Pass[];

        const startY: number = piece.position.y - piece.position.x;
        for (let i: number = 0; i < this.constants.boardMatrixSize; i++) {
            const movePosition: Position = new Position(i, startY + i);
            moves.push(new Pass(piece.position, movePosition));
        }

        const startX: number = piece.position.x + piece.position.y;
        for (let i: number = 0; i < this.constants.boardMatrixSize; i++) {
            const movePosition: Position = new Position(startX - i, i);
            moves.push(new Pass(piece.position, movePosition));
        }

        return moves;
    }

    getLegalBishopMoves(piece: Piece): Move[] {
        const moves: Move[] = [] as Move[];
        const possibleMoves: Move[] = this.getPossibleBishopMoves(piece);

        for (let i: number = 0; i < possibleMoves.length; i++) {
            if (
                !this.attackingOwnColor(piece, possibleMoves[i].newPosition) &&
                !this.goingThroughPieces(piece, possibleMoves[i].newPosition) &&
                this.isOnBoard(possibleMoves[i].newPosition)
            ) {
                moves.push(possibleMoves[i]);
            }
        }
        
        return moves;
    }

    getPossibleQueenMoves(piece: Piece): Move[] {
        const moves: Pass[] = [] as Pass[];

        for (let i: number = 0; i < this.constants.boardMatrixSize; i++) {
            const movePosition: Position = new Position(piece.position.x, i);
            moves.push(new Pass(piece.position, movePosition));
        }

        for (let i: number = 0; i < this.constants.boardMatrixSize; i++) {
            const movePosition: Position = new Position(i, piece.position.y);
            moves.push(new Pass(piece.position, movePosition));
        }

        let startY: number = piece.position.y - piece.position.x;
        for (let i: number = 0; i < this.constants.boardMatrixSize; i++) {
            const movePosition: Position = new Position(i, startY + i);
            moves.push(new Pass(piece.position, movePosition));
        }

        let startX: number = piece.position.x + piece.position.y;
        for (let i: number = 0; i < this.constants.boardMatrixSize; i++) {
            const movePosition: Position = new Position(startX - i, i);
            moves.push(new Pass(piece.position, movePosition));
        }

        return moves;
    }
    
    getLegalQueenMoves(piece: Piece): Move[] {
        const moves: Move[] = [] as Move[];
        const possibleMoves: Move[] = this.getPossibleQueenMoves(piece);

        for (let i: number = 0; i < possibleMoves.length; i++) {
            if (
                !this.attackingOwnColor(piece, possibleMoves[i].newPosition) &&
                !this.goingThroughPieces(piece, possibleMoves[i].newPosition) &&
                this.isOnBoard(possibleMoves[i].newPosition)
            ) {
                moves.push(possibleMoves[i]);
            }
        }
        
        return moves;
    }

    getPossibleKingMoves(piece: Piece): Move[] {
        let moves: Pass[] = [] as Pass[];

        for (let i: number = -1; i < 2; i++) {
            for (let j: number = -1; j < 2; j++) {
                const newPosition: Position = new Position(piece.position.x + i, piece.position.y + j);
                if (
                    !this.attackingOwnColor(piece, newPosition) &&
                    this.isOnBoard(newPosition)
                ) {
                    moves.push(new Pass(piece.position, newPosition));
                }
            }
        }

        return moves;
    }

    getLegalKingMoves(piece: Piece): Move[] {
        const moves: Move[] = [] as Move[];
        const possibleMoves: Move[] = this.getPossibleKingMoves(piece);

        for (let i: number = 0; i < possibleMoves.length; i++) {
            if (
                !this.attackingOwnColor(piece, possibleMoves[i].newPosition) &&
                this.isOnBoard(possibleMoves[i].newPosition)
            ) {
                moves.push(possibleMoves[i]);
            }
        }

        if (piece.moveCount === 0) {
            const coloredPieces: Piece[] = this.filterPiecesToColor(this.boardMatrix, piece.color);
            const filteredRooks: Rook[] = this.filterPiecesToType(coloredPieces, PieceType.ROOK) as Rook[];
            this.console.log("filteredRooks: ", filteredRooks);

            for (let i: number = 0; i < filteredRooks.length; i++) {
                const rook: Rook = filteredRooks[i];
                const unmoved: boolean = rook.moveCount === 0;
                
                const kingDistance: number = 2;
                const kingDirection: number = (rook.position.x - piece.position.x) / Math.abs(rook.position.x - piece.position.x);
                const kingMovePosition: Position = new Position(piece.position.x + kingDistance * kingDirection, piece.position.y);

                let rookDistance: number = 0;
                if (kingDirection < 0) {
                    rookDistance = 3;
                } else if (kingDirection > 0) {
                    rookDistance = 2;
                }
                const rookDirection: number = -1 * kingDirection;
                const rookMovePosition: Position = new Position(rook.position.x + rookDistance * rookDirection, rook.position.y);
                
                let safe: boolean = true;
                for (let j: number = 0; j < kingDistance; j++) {
                    const kingCurrentMovePosition: Position = new Position(piece.position.x + kingDirection * j, piece.position.y);
                    if (
                        !this.getPieceAtTilePosition(kingCurrentMovePosition).valid &&
                        !this.attackedByOppositeColor(piece, kingCurrentMovePosition) &&
                        !unmoved
                    ) {
                        safe = false;
                    }
                }

                if (safe) {
                    moves.push(new Castle(piece.position, kingMovePosition, rook.position, rookMovePosition));
                }
                
            }
        }
        return moves;
    }

    attackingOwnColor(piece: Piece, position: Position): boolean {
        let pieceAtTilePosition: Piece = this.getPieceAtTilePosition(position);
        if (pieceAtTilePosition.valid) {
            return this.getPieceAtTilePosition(position).color === piece.color;
        }
        return false;
    }

    attackingOppositeColor(piece: Piece, position: Position): boolean {
        let pieceAtTilePosition: Piece = this.getPieceAtTilePosition(position);
        if (pieceAtTilePosition.valid) {
            if (piece.color === PlayerColor.WHITE) {
                return pieceAtTilePosition.color === PlayerColor.BLACK;
            } else if (piece.color === PlayerColor.BLACK) {
                return pieceAtTilePosition.color === PlayerColor.WHITE;
            } else {
                return false;
            }
        }
        return false;
    }

    attackedByOwnColor(piece: Piece, position: Position): boolean {
        const pieces: Piece[] = this.filterPiecesToColor(this.boardMatrix, piece.color);
        for (let i: number = 0; i < pieces.length; i++) {
            const currentPiece: Piece = pieces[i];
            const legalMoves: Move[] = this.getLegalMoves(currentPiece);
            for (let j: number = 0; j < legalMoves.length; j++) {
                if (position.equals(legalMoves[j].newPosition)) {
                    return true;
                }
            }
        }

        return false;
    }

    attackedByOppositeColor(piece: Piece, position: Position): boolean {
        let oppositeColor: PlayerColor = PlayerColor.NONE;
        if (piece.color === PlayerColor.WHITE) {
            oppositeColor = PlayerColor.BLACK;
        } else if (piece.color === PlayerColor.BLACK) {
            oppositeColor = PlayerColor.WHITE;
        }
        const pieces: Piece[] = this.filterPiecesToColor(this.boardMatrix, oppositeColor);

        for (let i: number = 0; i < pieces.length; i++) {
            const currentPiece: Piece = pieces[i];
            const legalMoves: Move[] = this.getLegalMoves(currentPiece);
            for (let j: number = 0; j < legalMoves.length; j++) {
                if (position.equals(legalMoves[j].newPosition)) {
                    return true;
                }
            }
        }

        return false;
    }

    goingThroughPieces(piece: Piece, position: Position): boolean {
        const distanceX: number = position.x - piece.position.x;
        let stepX: number = distanceX;
        if (stepX !== 0) {
            stepX = stepX / Math.abs(stepX);
        }
        const distanceY: number = position.y - piece.position.y;
        let stepY: number = distanceY;
        if (stepY !== 0) {
            stepY = stepY / Math.abs(stepY);
        }

        let steps: number = Math.max(Math.abs(distanceX), Math.abs(distanceY));
        for (let i: number = 1; i < steps; i++) {
            const position: Position = new Position(piece.position.x + i * stepX, piece.position.y + i * stepY);
            const currentPiece: Piece = this.getPieceAtTilePosition(position);
            if (currentPiece.valid) {
                return true;
            }
        }

        return false;
    }

    isOnBoard(position: Position): boolean {
        return position.x > -1 && position.x < this.constants.boardMatrixSize && position.y > -1 && position.y < this.constants.boardMatrixSize;
    }
}

export { Board };