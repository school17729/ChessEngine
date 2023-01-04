class StandardContext {
    constructor(globals, canvas) {
        this.globals = globals;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
    }
    init() {
    }
    fillStyle(color) {
        this.ctx.fillStyle = color;
    }
    fontUnconverted(font) {
        this.ctx.font = font;
    }
    fontConverted(font) {
        let mode = "size";
        let fontSizeStr = "";
        let fontRemainderStr = "";
        for (let i = 0; i < font.length; i++) {
            if (mode === "size") {
                if (font[i] === "p") {
                    fontRemainderStr += font[i];
                    mode = "remainder";
                }
                else {
                    fontSizeStr += font[i];
                }
            }
            else if (mode === "remainder") {
                fontRemainderStr += font[i];
            }
        }
        this.ctx.font = this.convert(Number(fontSizeStr)) + fontRemainderStr;
    }
    strokeWidth(thickness) {
        this.ctx.lineWidth = this.convert(thickness);
    }
    strokeRect(x, y, width, height, thickness, color) {
        this.fillStyle(color);
        this.strokeWidth(thickness);
        this.ctx.strokeRect(this.convert(x), this.convert(y), this.convert(width), this.convert(height));
    }
    fillRect(x, y, width, height, color) {
        this.fillStyle(color);
        this.ctx.fillRect(this.convert(x), this.convert(y), this.convert(width), this.convert(height));
    }
    measureTextWidth(text) {
        return this.ctx.measureText(text).width;
    }
    fillText(text, x, y, color, font) {
        this.fillStyle(color);
        this.fontConverted(font);
        this.ctx.fillText(text, this.convert(x), this.convert(y));
    }
    drawImage(image, x, y, width, height) {
        this.ctx.drawImage(image, this.convert(x), this.convert(y), this.convert(width), this.convert(height));
    }
    clear() {
        this.fillRect(0, 0, 1000, 1000, "rgb(255, 255, 255)");
    }
    convert(value) {
        return (value / 1000) * this.canvas.width;
    }
}
export { StandardContext };
