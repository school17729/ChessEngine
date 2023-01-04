import { Globals } from "./globals.js";

class StandardContext {

    globals: Globals;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor(globals: Globals, canvas: HTMLCanvasElement) {
        this.globals = globals;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    }

    init(): void {
        
    }

    fillStyle(color: string): void {
        this.ctx.fillStyle = color;
    }

    fontUnconverted(font: string): void {
        this.ctx.font = font;
    }

    fontConverted(font: string): void {
        let mode: string = "size";
        let fontSizeStr: string = "";
        let fontRemainderStr: string = "";
        for (let i = 0; i < font.length; i++) {
            if (mode === "size") {
                if (font[i] === "p") {
                    fontRemainderStr += font[i];
                    mode = "remainder";
                } else {
                    fontSizeStr += font[i];
                }
            } else if (mode === "remainder") {
                fontRemainderStr += font[i];
            }
        }

        this.ctx.font = this.convert(Number(fontSizeStr)) + fontRemainderStr;
    }

    strokeWidth(thickness: number): void {
        this.ctx.lineWidth = this.convert(thickness);
    }

    strokeRect(x: number, y: number, width: number, height: number, thickness: number, color: string): void {
        this.fillStyle(color);
        this.strokeWidth(thickness);
        this.ctx.strokeRect(
            this.convert(x),
            this.convert(y),
            this.convert(width),
            this.convert(height)
        );
    }

    fillRect(x: number, y: number, width: number, height: number, color: string): void {
        this.fillStyle(color);
        this.ctx.fillRect(
            this.convert(x),
            this.convert(y),
            this.convert(width),
            this.convert(height)
        );
    }

    measureTextWidth(text: string): number {
        return this.ctx.measureText(text).width;
    }

    fillText(text: string, x: number, y: number, color: string, font: string): void {
        this.fillStyle(color);
        this.fontConverted(font);
        this.ctx.fillText(
            text,
            this.convert(x),
            this.convert(y)
        );
    }

    drawImage(image: HTMLImageElement, x: number, y: number, width: number, height: number): void {
        this.ctx.drawImage(image, this.convert(x), this.convert(y), this.convert(width), this.convert(height));
    }

    clear(): void {
        this.fillRect(0, 0, 1000, 1000, "rgb(255, 255, 255)");
    }

    convert(value: number): number {
        return (value / 1000) * this.canvas.width;
    }
}

export { StandardContext };