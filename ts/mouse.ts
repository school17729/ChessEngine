import { Globals } from "./globals.js";

class Mouse {
    globals: Globals;
    canvas: HTMLCanvasElement;

    leftButton: boolean;
    rightButton: boolean;
    middleButton: boolean;

    leftButtonDown: boolean;
    rightButtonDown: boolean;
    middleButtonDown: boolean;

    leftButtonPressed: boolean;
    rightButtonPressed: boolean;
    middleButtonPressed: boolean;

    leftButtonUp: boolean;
    rightButtonUp: boolean;
    middleButtonUp: boolean;

    mouseX: number;
    mouseY: number;

    constructor(globals: Globals, canvas: HTMLCanvasElement) {
        this.globals = globals;
        this.canvas = canvas;

        this.leftButton = false;
        this.rightButton = false;
        this.middleButton = false;

        this.leftButtonDown = false;
        this.rightButtonDown = false;
        this.middleButtonDown = false;

        this.leftButtonPressed = false;
        this.rightButtonPressed = false;
        this.middleButtonPressed = false;

        this.leftButtonUp = false;
        this.rightButtonUp = false;
        this.middleButtonUp = false;

        this.mouseX = 0;
        this.mouseY = 0;
    }

    init(): void {
        this.globals.window.addEventListener("mousedown", this.mousedown.bind(this));
        this.globals.window.addEventListener("mouseup", this.mouseup.bind(this));
        this.globals.window.addEventListener("mousemove", this.mousemove.bind(this));
    }

    update(): void {
        this.leftButtonDown = false;
        this.middleButtonDown = false;
        this.rightButtonDown = false;
        this.leftButtonUp = false;
        this.middleButtonUp = false;
        this.rightButtonUp = false;

        if (this.leftButton && !this.leftButtonPressed) {
            this.leftButtonDown = true;
            this.leftButtonPressed = true;
        }
        if (this.rightButton && !this.rightButtonPressed) {
            this.rightButtonDown = true;
            this.rightButtonPressed = true;
        }
        if (this.middleButton && !this.middleButtonPressed) {
            this.middleButtonDown = true;
            this.middleButtonPressed = true;
        }
        if (!this.leftButton && this.leftButtonPressed) {
            this.leftButtonUp = true;
            this.leftButtonPressed = false;
        }
        if (!this.rightButton && this.rightButtonPressed) {
            this.rightButtonUp = true;
            this.rightButtonPressed = false;
        }
        if (!this.middleButton && this.middleButtonPressed) {
            this.middleButtonUp = true;
            this.middleButtonPressed = false;
        }
    }

    mousedown(e: MouseEvent): void {
        if (e.button === 0) {
            this.leftButton = true;
        } else if (e.button === 2) {
            this.rightButton = true;
        } else if (e.button === 1) {
            this.middleButton = true;
        }
    }

    mouseup(e: MouseEvent): void {
        if (e.button === 0) {
            this.leftButton = false;
        } else if (e.button === 2) {
            this.rightButton = false;
        } else if (e.button === 1) {
            this.middleButton = false;
        }
    }

    mousemove(e: MouseEvent): void {
        this.mouseX = (1000 / this.canvas.width) * e.clientX + ((500 * (this.canvas.width - this.globals.window.innerWidth)) / this.canvas.width);
        this.mouseY = (1000 / this.canvas.height) * e.clientY + ((500 * (this.canvas.height - this.globals.window.innerHeight)) / this.canvas.height);
    }
}

export { Mouse };