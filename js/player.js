import { Position } from "./position.js";
import { PieceType } from "./pieceType.js";
import { InvalidPiece } from "./invalidPiece.js";
class Player {
    constructor(globalInstances, board, color) {
        this.globals = globalInstances.globals;
        this.resources = globalInstances.resources;
        this.sctx = globalInstances.sctx;
        this.globalInstances = globalInstances;
        this.constants = globalInstances.constants;
        this.board = board;
        this.color = color;
        this.boardMatrix = [];
        this.pieces = [];
        this.pawns = [];
        this.knights = [];
        this.bishops = [];
        this.rooks = [];
        this.queens = [];
        this.kings = [];
        this.tileSelected = false;
        this.selectedTile = new Position(0, 0);
        this.pieceSelected = false;
        this.selectedPiece = new InvalidPiece(this.globalInstances, this.board);
    }
    init() {
    }
    loop() {
        for (let i = 0; i < this.pieces.length; i++) {
            this.pieces[i].loop();
        }
    }
    draw() {
        if (this.tileSelected) {
            const selectedImage = this.resources.getImage(this.constants.selectedPath);
            const canvasTilePositionX = this.selectedTile.x * this.constants.tileWidth;
            const canvasTilePositionY = this.selectedTile.y * this.constants.tileHeight;
            this.sctx.drawImage(selectedImage, canvasTilePositionX, canvasTilePositionY, this.constants.tileWidth, this.constants.tileHeight);
        }
        if (this.pieceSelected) {
            const dotImage = this.resources.getImage(this.constants.dotPath);
            if (this.selectedPiece.valid) {
                const legalMoves = this.selectedPiece.getLegalMoves();
                for (let i = 0; i < legalMoves.length; i++) {
                    const canvasTilePositionX = legalMoves[i].position.x * this.constants.tileWidth;
                    const canvasTilePositionY = legalMoves[i].position.y * this.constants.tileHeight;
                    this.sctx.drawImage(dotImage, canvasTilePositionX, canvasTilePositionY, this.constants.tileWidth, this.constants.tileHeight);
                }
            }
        }
        for (let i = 0; i < this.pieces.length; i++) {
            this.pieces[i].draw();
        }
    }
    updatePieces() {
        this.pieces = [];
        for (let i = 0; i < this.boardMatrix.length; i++) {
            const piece = this.boardMatrix[i];
            if (piece.valid) {
                this.pieces.push(piece);
            }
        }
        this.pawns = [];
        this.knights = [];
        this.bishops = [];
        this.rooks = [];
        this.queens = [];
        this.kings = [];
        for (let i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].type === PieceType.PAWN) {
                this.pawns.push(this.pieces[i]);
            }
            else if (this.pieces[i].type === PieceType.KNIGHT) {
                this.knights.push(this.pieces[i]);
            }
            else if (this.pieces[i].type === PieceType.BISHOP) {
                this.bishops.push(this.pieces[i]);
            }
            else if (this.pieces[i].type === PieceType.ROOK) {
                this.rooks.push(this.pieces[i]);
            }
            else if (this.pieces[i].type === PieceType.QUEEN) {
                this.queens.push(this.pieces[i]);
            }
            else if (this.pieces[i].type === PieceType.KING) {
                this.kings.push(this.pieces[i]);
            }
        }
    }
    handleTileClicked(position) {
        // this.console.log("this.tileSelected: " + this.tileSelected);
        // this.console.log("this.pieceSelected: " + this.pieceSelected);
        if (this.selectedTile.x === position.x && this.selectedTile.y === position.y) {
            this.tileSelected = !this.tileSelected;
            this.pieceSelected = !this.pieceSelected;
            this.selectedPiece = this.getPieceAtTilePosition(this.selectedTile);
        }
        else {
            if (this.selectedPiece.valid) {
                const legalMoves = this.selectedPiece.getLegalMoves();
                for (let i = 0; i < legalMoves.length; i++) {
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
            const piece = this.getPieceAtTilePosition(this.selectedTile);
            if (piece.valid) {
                this.pieceSelected = true;
                this.selectedPiece = piece;
            }
            else {
                this.pieceSelected = false;
            }
        }
    }
    getPieceAtTilePosition(position) {
        if (this.isOnBoard(position)) {
            return this.boardMatrix[position.y * 8 + position.x];
        }
        return new InvalidPiece(this.globalInstances, this.board);
    }
    isOnBoard(position) {
        return position.x > -1 && position.x < this.constants.boardMatrixSize && position.y > -1 && position.y < this.constants.boardMatrixSize;
    }
    movePiece(move) {
        this.board.movePiece(this.selectedPiece.matrixPosition, move);
        this.selectedPiece.move(move);
    }
}
export { Player };
