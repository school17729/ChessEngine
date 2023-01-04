class Mouse {
    constructor(globals, canvas) {
        this.globals = globals;
        this.canvas = canvas;
        this.leftButton = false;
        this.rightButton = false;
        this.middleButton = false;
        this.mouseX = 0;
        this.mouseY = 0;
    }
    init() {
        this.globals.window.addEventListener("mousedown", this.mousedown.bind(this));
        this.globals.window.addEventListener("mouseup", this.mouseup.bind(this));
        this.globals.window.addEventListener("mousemove", this.mousemove.bind(this));
    }
    mousedown(e) {
        if (e.button === 0) {
            this.leftButton = true;
        }
        else if (e.button === 2) {
            this.rightButton = true;
        }
        else if (e.button === 1) {
            this.middleButton = true;
        }
    }
    mouseup(e) {
        if (e.button === 0) {
            this.leftButton = false;
        }
        else if (e.button === 2) {
            this.rightButton = false;
        }
        else if (e.button === 1) {
            this.middleButton = false;
        }
    }
    mousemove(e) {
        this.mouseX = (1000 / this.canvas.width) * e.clientX + ((500 * (this.canvas.width - this.globals.window.innerWidth)) / this.canvas.width);
        this.mouseY = (1000 / this.canvas.height) * e.clientY + ((500 * (this.canvas.height - this.globals.window.innerHeight)) / this.canvas.height);
    }
}
export { Mouse };
