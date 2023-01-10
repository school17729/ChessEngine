var MoveType;
(function (MoveType) {
    MoveType[MoveType["PASS"] = 0] = "PASS";
    MoveType[MoveType["CAPTURE"] = 1] = "CAPTURE";
    MoveType[MoveType["CASTLE"] = 2] = "CASTLE";
    MoveType[MoveType["PROMOTION"] = 3] = "PROMOTION";
    MoveType[MoveType["NONE"] = 4] = "NONE";
})(MoveType || (MoveType = {}));
export { MoveType };
