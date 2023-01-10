class Player {
    constructor(globalInstances, board, color, controlType, valid) {
        this.globals = globalInstances.globals;
        this.resources = globalInstances.resources;
        this.sctx = globalInstances.sctx;
        this.globalInstances = globalInstances;
        this.constants = globalInstances.constants;
        this.board = board;
        this.color = color;
        this.controlType = controlType;
        this.valid = valid;
    }
    init() {
    }
    loop() {
    }
    draw() {
    }
}
export { Player };
