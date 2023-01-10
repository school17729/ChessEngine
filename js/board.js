import { Position } from "./position.js";
import { Pass } from "./pass.js";
import { Castle } from "./castle.js";
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
        this.tileSelected = false;
        this.selectedTile = new Position(0, 0);
        this.pieceSelected = false;
        this.selectedPiece = new InvalidPiece(this.globalInstances);
        this.turn = PlayerColor.WHITE;
    }
    init() {
        this.boardMatrix.push(new Rook(this.globalInstances, PlayerColor.BLACK, new Position(0, 0)));
        this.boardMatrix.push(new Knight(this.globalInstances, PlayerColor.BLACK, new Position(1, 0)));
        this.boardMatrix.push(new Bishop(this.globalInstances, PlayerColor.BLACK, new Position(2, 0)));
        this.boardMatrix.push(new Queen(this.globalInstances, PlayerColor.BLACK, new Position(3, 0)));
        this.boardMatrix.push(new King(this.globalInstances, PlayerColor.BLACK, new Position(4, 0)));
        this.boardMatrix.push(new Bishop(this.globalInstances, PlayerColor.BLACK, new Position(5, 0)));
        this.boardMatrix.push(new Knight(this.globalInstances, PlayerColor.BLACK, new Position(6, 0)));
        this.boardMatrix.push(new Rook(this.globalInstances, PlayerColor.BLACK, new Position(7, 0)));
        for (let i = 0; i < this.constants.boardMatrixSize; i++) {
            this.boardMatrix.push(new Pawn(this.globalInstances, PlayerColor.BLACK, new Position(i, 1)));
        }
        for (let i = 0; i < this.constants.boardMatrixSize * (this.constants.boardMatrixSize - 4); i++) {
            this.boardMatrix.push(new InvalidPiece(this.globalInstances));
        }
        for (let i = 0; i < this.constants.boardMatrixSize; i++) {
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
    loop() {
        const pieces = this.getPieces();
        for (let i = 0; i < pieces.length; i++) {
            pieces[i].loop();
        }
        this.draw();
        for (let i = 0; i < pieces.length; i++) {
            pieces[i].draw();
        }
    }
    draw() {
        const boardImage = this.resources.getImage(this.constants.chessBoardPath);
        this.sctx.drawImage(boardImage, 0, 0, 1000, 1000);
        if (this.tileSelected) {
            const selectedImage = this.resources.getImage(this.constants.selectedPath);
            const canvasTilePositionX = this.selectedTile.x * this.constants.tileWidth;
            const canvasTilePositionY = this.selectedTile.y * this.constants.tileHeight;
            this.sctx.drawImage(selectedImage, canvasTilePositionX, canvasTilePositionY, this.constants.tileWidth, this.constants.tileHeight);
        }
        if (this.pieceSelected) {
            const dotImage = this.resources.getImage(this.constants.dotPath);
            if (this.selectedPiece.valid) {
                const legalMoves = this.getLegalMoves(this.selectedPiece);
                for (let i = 0; i < legalMoves.length; i++) {
                    const canvasTilePositionX = legalMoves[i].newPosition.x * this.constants.tileWidth;
                    const canvasTilePositionY = legalMoves[i].newPosition.y * this.constants.tileHeight;
                    this.sctx.drawImage(dotImage, canvasTilePositionX, canvasTilePositionY, this.constants.tileWidth, this.constants.tileHeight);
                }
            }
        }
        const pieces = this.getPieces();
        for (let i = 0; i < pieces.length; i++) {
            pieces[i].draw();
        }
    }
    selectTile(position) {
        this.tileSelected = true;
        this.selectedTile = position;
        const piece = this.getPieceAtTilePosition(this.selectedTile);
        if (piece.valid) {
            this.selectPiece(piece);
        }
        else {
            this.unselectPiece();
        }
    }
    unselectTile() {
        this.tileSelected = false;
        this.selectedTile = new Position(0, 0);
        const piece = this.getPieceAtTilePosition(this.selectedTile);
        if (piece.valid) {
            this.unselectPiece();
        }
    }
    selectPiece(piece) {
        this.pieceSelected = true;
        this.selectedPiece = piece;
    }
    unselectPiece() {
        this.pieceSelected = false;
        this.selectedPiece = new InvalidPiece(this.globalInstances);
    }
    movePiece(move) {
        const piece = this.getPieceAtTilePosition(move.oldPosition);
        if (piece.valid) {
            this.setPieceAtTilePosition(piece.position, new InvalidPiece(this.globalInstances));
            this.setPieceAtTilePosition(move.newPosition, piece);
            piece.move(move);
        }
        this.console.log(this.boardMatrix);
        if (this.turn === PlayerColor.WHITE) {
            this.turn = PlayerColor.BLACK;
        }
        else if (this.turn === PlayerColor.BLACK) {
            this.turn = PlayerColor.WHITE;
        }
    }
    getPieceAtTilePosition(position) {
        const invalidPiece = new InvalidPiece(this.globalInstances);
        if (this.isOnBoard(position)) {
            return this.boardMatrix[position.y * 8 + position.x];
        }
        return invalidPiece;
    }
    setPieceAtTilePosition(position, piece) {
        this.boardMatrix[position.y * 8 + position.x] = piece;
    }
    getPieces() {
        const pieces = [];
        for (let i = 0; i < this.boardMatrix.length; i++) {
            if (this.boardMatrix[i].valid) {
                pieces.push(this.boardMatrix[i]);
            }
        }
        return pieces;
    }
    filterPiecesToType(pieces, type) {
        const filteredPieces = [];
        for (let i = 0; i < pieces.length; i++) {
            if (pieces[i].valid) {
                if (pieces[i].type === type) {
                    filteredPieces.push(pieces[i]);
                }
            }
        }
        return filteredPieces;
    }
    filterPiecesToColor(pieces, color) {
        const filteredPieces = [];
        for (let i = 0; i < pieces.length; i++) {
            if (pieces[i].valid) {
                if (pieces[i].color === color) {
                    filteredPieces.push(pieces[i]);
                }
            }
        }
        return filteredPieces;
    }
    getLegalMoves(piece) {
        let legalMoves = [];
        if (piece.type === PieceType.PAWN) {
            legalMoves = this.getLegalPawnMoves(piece);
        }
        else if (piece.type === PieceType.KNIGHT) {
            legalMoves = this.getLegalKnightMoves(piece);
        }
        else if (piece.type === PieceType.BISHOP) {
            legalMoves = this.getLegalBishopMoves(piece);
        }
        else if (piece.type === PieceType.QUEEN) {
            legalMoves = this.getLegalQueenMoves(piece);
        }
        else if (piece.type === PieceType.KING) {
            legalMoves = this.getLegalKingMoves(piece);
        }
        return legalMoves;
    }
    getLegalPawnMoves(piece) {
        const moves = [];
        let newPosition;
        for (let i = -1; i < 2; i += 2) {
            let newPosition;
            if (piece.color === PlayerColor.WHITE) {
                newPosition = new Position(piece.position.x + i, piece.position.y - 1);
            }
            else if (piece.color === PlayerColor.BLACK) {
                newPosition = new Position(piece.position.x + i, piece.position.y + 1);
            }
            else {
                newPosition = new Position(0, 0);
            }
            if (this.attackingOppositeColor(piece, newPosition) &&
                this.isOnBoard(newPosition)) {
                moves.push(new Pass(piece.position, newPosition));
            }
        }
        if (piece.color === PlayerColor.WHITE) {
            newPosition = new Position(piece.position.x, piece.position.y - 1);
        }
        else if (piece.color === PlayerColor.BLACK) {
            newPosition = new Position(piece.position.x, piece.position.y + 1);
        }
        else {
            newPosition = new Position(0, 0);
        }
        if (!this.attackingOwnColor(piece, newPosition) &&
            !this.attackingOppositeColor(piece, newPosition) &&
            this.isOnBoard(newPosition)) {
            moves.push(new Pass(piece.position, newPosition));
        }
        if (piece.moveCount === 0) {
            if (piece.color === PlayerColor.WHITE) {
                newPosition = new Position(piece.position.x, piece.position.y - 2);
            }
            else if (piece.color === PlayerColor.BLACK) {
                newPosition = new Position(piece.position.x, piece.position.y + 2);
            }
            else {
                newPosition = new Position(0, 0);
            }
        }
        if (!this.attackingOwnColor(piece, newPosition) &&
            !this.attackingOppositeColor(piece, newPosition) &&
            !this.goingThroughPieces(piece, newPosition) &&
            this.isOnBoard(newPosition)) {
            moves.push(new Pass(piece.position, newPosition));
        }
        return moves;
    }
    getPossibleKnightMoves(piece) {
        const moves = [];
        for (let i = -1; i < 2; i += 2) {
            for (let j = -2; j < 3; j += 4) {
                const newPosition = new Position(piece.position.x + i, piece.position.y + j);
                moves.push(new Pass(piece.position, newPosition));
            }
        }
        for (let i = -2; i < 3; i += 4) {
            for (let j = -1; j < 2; j += 2) {
                const movePosition = new Position(piece.position.x + i, piece.position.y + j);
                moves.push(new Pass(piece.position, movePosition));
            }
        }
        return moves;
    }
    getLegalKnightMoves(piece) {
        const moves = [];
        const possibleMoves = this.getPossibleKnightMoves(piece);
        for (let i = 0; i < possibleMoves.length; i++) {
            if (!this.attackingOwnColor(piece, possibleMoves[i].newPosition) &&
                this.isOnBoard(possibleMoves[i].newPosition)) {
                moves.push(possibleMoves[i]);
            }
        }
        return moves;
    }
    getPossibleBishopMoves(piece) {
        const moves = [];
        const startY = piece.position.y - piece.position.x;
        for (let i = 0; i < this.constants.boardMatrixSize; i++) {
            const movePosition = new Position(i, startY + i);
            moves.push(new Pass(piece.position, movePosition));
        }
        const startX = piece.position.x + piece.position.y;
        for (let i = 0; i < this.constants.boardMatrixSize; i++) {
            const movePosition = new Position(startX - i, i);
            moves.push(new Pass(piece.position, movePosition));
        }
        return moves;
    }
    getLegalBishopMoves(piece) {
        const moves = [];
        const possibleMoves = this.getPossibleBishopMoves(piece);
        for (let i = 0; i < possibleMoves.length; i++) {
            if (!this.attackingOwnColor(piece, possibleMoves[i].newPosition) &&
                !this.goingThroughPieces(piece, possibleMoves[i].newPosition) &&
                this.isOnBoard(possibleMoves[i].newPosition)) {
                moves.push(possibleMoves[i]);
            }
        }
        return moves;
    }
    getPossibleQueenMoves(piece) {
        const moves = [];
        for (let i = 0; i < this.constants.boardMatrixSize; i++) {
            const movePosition = new Position(piece.position.x, i);
            moves.push(new Pass(piece.position, movePosition));
        }
        for (let i = 0; i < this.constants.boardMatrixSize; i++) {
            const movePosition = new Position(i, piece.position.y);
            moves.push(new Pass(piece.position, movePosition));
        }
        let startY = piece.position.y - piece.position.x;
        for (let i = 0; i < this.constants.boardMatrixSize; i++) {
            const movePosition = new Position(i, startY + i);
            moves.push(new Pass(piece.position, movePosition));
        }
        let startX = piece.position.x + piece.position.y;
        for (let i = 0; i < this.constants.boardMatrixSize; i++) {
            const movePosition = new Position(startX - i, i);
            moves.push(new Pass(piece.position, movePosition));
        }
        return moves;
    }
    getLegalQueenMoves(piece) {
        const moves = [];
        const possibleMoves = this.getPossibleQueenMoves(piece);
        for (let i = 0; i < possibleMoves.length; i++) {
            if (!this.attackingOwnColor(piece, possibleMoves[i].newPosition) &&
                !this.goingThroughPieces(piece, possibleMoves[i].newPosition) &&
                this.isOnBoard(possibleMoves[i].newPosition)) {
                moves.push(possibleMoves[i]);
            }
        }
        return moves;
    }
    getPossibleKingMoves(piece) {
        let moves = [];
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                const newPosition = new Position(piece.position.x + i, piece.position.y + j);
                if (!this.attackingOwnColor(piece, newPosition) &&
                    this.isOnBoard(newPosition)) {
                    moves.push(new Pass(piece.position, newPosition));
                }
            }
        }
        return moves;
    }
    getLegalKingMoves(piece) {
        const moves = [];
        const possibleMoves = this.getPossibleKingMoves(piece);
        for (let i = 0; i < possibleMoves.length; i++) {
            if (!this.attackingOwnColor(piece, possibleMoves[i].newPosition) &&
                this.isOnBoard(possibleMoves[i].newPosition)) {
                moves.push(possibleMoves[i]);
            }
        }
        if (piece.moveCount === 0) {
            const coloredPieces = this.filterPiecesToColor(this.boardMatrix, piece.color);
            const filteredRooks = this.filterPiecesToType(coloredPieces, PieceType.ROOK);
            this.console.log("filteredRooks: ", filteredRooks);
            for (let i = 0; i < filteredRooks.length; i++) {
                const rook = filteredRooks[i];
                const unmoved = rook.moveCount === 0;
                const kingDistance = 2;
                const kingDirection = (rook.position.x - piece.position.x) / Math.abs(rook.position.x - piece.position.x);
                const kingMovePosition = new Position(piece.position.x + kingDistance * kingDirection, piece.position.y);
                let rookDistance = 0;
                if (kingDirection < 0) {
                    rookDistance = 3;
                }
                else if (kingDirection > 0) {
                    rookDistance = 2;
                }
                const rookDirection = -1 * kingDirection;
                const rookMovePosition = new Position(rook.position.x + rookDistance * rookDirection, rook.position.y);
                let safe = true;
                for (let j = 0; j < kingDistance; j++) {
                    const kingCurrentMovePosition = new Position(piece.position.x + kingDirection * j, piece.position.y);
                    if (!this.getPieceAtTilePosition(kingCurrentMovePosition).valid &&
                        !this.attackedByOppositeColor(piece, kingCurrentMovePosition) &&
                        !unmoved) {
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
    attackingOwnColor(piece, position) {
        let pieceAtTilePosition = this.getPieceAtTilePosition(position);
        if (pieceAtTilePosition.valid) {
            return this.getPieceAtTilePosition(position).color === piece.color;
        }
        return false;
    }
    attackingOppositeColor(piece, position) {
        let pieceAtTilePosition = this.getPieceAtTilePosition(position);
        if (pieceAtTilePosition.valid) {
            if (piece.color === PlayerColor.WHITE) {
                return pieceAtTilePosition.color === PlayerColor.BLACK;
            }
            else if (piece.color === PlayerColor.BLACK) {
                return pieceAtTilePosition.color === PlayerColor.WHITE;
            }
            else {
                return false;
            }
        }
        return false;
    }
    attackedByOwnColor(piece, position) {
        const pieces = this.filterPiecesToColor(this.boardMatrix, piece.color);
        for (let i = 0; i < pieces.length; i++) {
            const currentPiece = pieces[i];
            const legalMoves = this.getLegalMoves(currentPiece);
            for (let j = 0; j < legalMoves.length; j++) {
                if (position.equals(legalMoves[j].newPosition)) {
                    return true;
                }
            }
        }
        return false;
    }
    attackedByOppositeColor(piece, position) {
        let oppositeColor = PlayerColor.NONE;
        if (piece.color === PlayerColor.WHITE) {
            oppositeColor = PlayerColor.BLACK;
        }
        else if (piece.color === PlayerColor.BLACK) {
            oppositeColor = PlayerColor.WHITE;
        }
        const pieces = this.filterPiecesToColor(this.boardMatrix, oppositeColor);
        for (let i = 0; i < pieces.length; i++) {
            const currentPiece = pieces[i];
            const legalMoves = this.getLegalMoves(currentPiece);
            for (let j = 0; j < legalMoves.length; j++) {
                if (position.equals(legalMoves[j].newPosition)) {
                    return true;
                }
            }
        }
        return false;
    }
    goingThroughPieces(piece, position) {
        const distanceX = position.x - piece.position.x;
        let stepX = distanceX;
        if (stepX !== 0) {
            stepX = stepX / Math.abs(stepX);
        }
        const distanceY = position.y - piece.position.y;
        let stepY = distanceY;
        if (stepY !== 0) {
            stepY = stepY / Math.abs(stepY);
        }
        let steps = Math.max(Math.abs(distanceX), Math.abs(distanceY));
        for (let i = 1; i < steps; i++) {
            const position = new Position(piece.position.x + i * stepX, piece.position.y + i * stepY);
            const currentPiece = this.getPieceAtTilePosition(position);
            if (currentPiece.valid) {
                return true;
            }
        }
        return false;
    }
    isOnBoard(position) {
        return position.x > -1 && position.x < this.constants.boardMatrixSize && position.y > -1 && position.y < this.constants.boardMatrixSize;
    }
}
export { Board };
