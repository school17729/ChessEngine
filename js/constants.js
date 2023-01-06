class Constants {
    constructor() {
        this.chessBoardPath = "./res/chessBoard.png";
        this.whitePawnPath = "./res/whitePawn.png";
        this.whiteKnightPath = "./res/whiteKnight.png";
        this.whiteBishopPath = "./res/whiteBishop.png";
        this.whiteRookPath = "./res/whiteRook.png";
        this.whiteQueenPath = "./res/whiteQueen.png";
        this.whiteKingPath = "./res/whiteKing.png";
        this.blackPawnPath = "./res/blackPawn.png";
        this.blackKnightPath = "./res/blackKnight.png";
        this.blackBishopPath = "./res/blackBishop.png";
        this.blackRookPath = "./res/blackRook.png";
        this.blackQueenPath = "./res/blackQueen.png";
        this.blackKingPath = "./res/blackKing.png";
        this.dotPath = "./res/dot.png";
        this.boardMatrixSize = 8;
        this.boardMatrixWidth = 8;
        this.boardMatrixHeight = 8;
        this.tileSize = 1000 / this.boardMatrixSize;
        this.tileWidth = 1000 / this.boardMatrixWidth;
        this.tileHeight = 1000 / this.boardMatrixHeight;
    }
    init() {
    }
}
export { Constants };
