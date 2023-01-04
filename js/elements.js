class Elements {
    constructor(globals) {
        this.ART_CANVAS_0_BORDER_THICKNESS = 3;
        this.ART_CANVAS_0_BORDER_COLOR = "rgb(0, 0, 0)";
        this.globals = globals;
        this.html = this.globals.document.body.parentElement;
        this.body = this.globals.document.body;
        this.container = this.createElement("div", this.body);
        this.canvas = this.createElement("canvas", this.container);
    }
    init() {
        this.toHtml0(this.html);
        this.toBody0(this.body);
        this.toContainerDiv(this.container);
        this.toArtCanvas(this.canvas);
    }
    createElement(tagName, parentElement) {
        const element = this.globals.document.createElement(tagName);
        parentElement.insertBefore(element, null);
        return element;
    }
    toHtml0(htmlElement) {
        const style = htmlElement.style;
        style.display = "block";
        style.padding = "0px";
        style.margin = "0px";
    }
    toBody0(bodyElement) {
        const style = bodyElement.style;
        style.display = "block";
        style.padding = "0px";
        style.margin = "0px";
    }
    toContainerDiv(divElement) {
        const style = divElement.style;
        style.display = "flex";
        style.alignItems = "center";
        style.justifyContent = "center";
        style.width = "100vw";
        style.height = "100vh";
    }
    toArtCanvas(canvasElement) {
        const style = canvasElement.style;
        style.display = "block";
        this.sizeArtCanvas0(canvasElement);
        style.border = this.ART_CANVAS_0_BORDER_THICKNESS + "px solid black";
        this.globals.window.addEventListener("resize", () => {
            this.sizeArtCanvas0(canvasElement);
        });
    }
    sizeArtCanvas0(canvasElement) {
        const canvasLength = (this.globals.window.innerWidth < this.globals.window.innerHeight ?
            this.globals.window.innerWidth - this.ART_CANVAS_0_BORDER_THICKNESS * 2 :
            this.globals.window.innerHeight - this.ART_CANVAS_0_BORDER_THICKNESS * 2);
        canvasElement.height = canvasElement.width = canvasLength;
    }
}
export { Elements };
