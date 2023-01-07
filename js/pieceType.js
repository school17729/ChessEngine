var PieceType;
(function (PieceType) {
    PieceType[PieceType["PAWN"] = 0] = "PAWN";
    PieceType[PieceType["KNIGHT"] = 1] = "KNIGHT";
    PieceType[PieceType["BISHOP"] = 2] = "BISHOP";
    PieceType[PieceType["ROOK"] = 3] = "ROOK";
    PieceType[PieceType["QUEEN"] = 4] = "QUEEN";
    PieceType[PieceType["KING"] = 5] = "KING";
    PieceType[PieceType["NONE"] = 6] = "NONE";
})(PieceType || (PieceType = {}));
export { PieceType };
