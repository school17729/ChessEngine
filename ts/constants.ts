class Constants {
    chessBoardPath: string = "./res/chessBoard.png";
    whitePawnPath: string = "./res/whitePawn.png";
    whiteKnightPath: string = "./res/whiteKnight.png";
    whiteBishopPath: string = "./res/whiteBishop.png";
    whiteRookPath: string = "./res/whiteRook.png";
    whiteQueenPath: string = "./res/whiteQueen.png";
    whiteKingPath: string = "./res/whiteKing.png";
    blackPawnPath: string = "./res/blackPawn.png";
    blackKnightPath: string = "./res/blackKnight.png";
    blackBishopPath: string = "./res/blackBishop.png";
    blackRookPath: string = "./res/blackRook.png";
    blackQueenPath: string = "./res/blackQueen.png";
    blackKingPath: string = "./res/blackKing.png";
    dotPath: string = "./res/dot.png";

    boardMatrixSize: number = 8;
    boardMatrixWidth: number = 8;
    boardMatrixHeight: number = 8;

    tileSize: number = 1000 / this.boardMatrixSize;
    tileWidth: number = 1000 / this.boardMatrixWidth;
    tileHeight: number = 1000 / this.boardMatrixHeight;

    constructor() {

    }

    init(): void {
        
    }
}

export { Constants };