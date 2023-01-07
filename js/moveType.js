var MoveType;
(function (MoveType) {
    MoveType[MoveType["MOVE"] = 0] = "MOVE";
    MoveType[MoveType["DOUBLE_PUSH"] = 1] = "DOUBLE_PUSH";
    MoveType[MoveType["CASTLE"] = 2] = "CASTLE";
    MoveType[MoveType["EN_PASSANT"] = 3] = "EN_PASSANT";
    MoveType[MoveType["NONE"] = 4] = "NONE";
})(MoveType || (MoveType = {}));
export { MoveType };
