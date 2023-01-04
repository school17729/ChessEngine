import { Globals } from "./globals.js";

class Elements {

    ART_CANVAS_0_BORDER_THICKNESS: number = 3;
    ART_CANVAS_0_BORDER_COLOR: string = "rgb(0, 0, 0)";

    globals: Globals;
    
    html: HTMLHtmlElement;
    body: HTMLBodyElement;
    
    container: HTMLDivElement;
    canvas: HTMLCanvasElement;

    constructor(globals: Globals) {
        this.globals = globals;
        
        this.html = this.globals.document.body.parentElement as HTMLHtmlElement;
        this.body = this.globals.document.body as HTMLBodyElement;
        
        this.container = this.createElement("div", this.body) as HTMLDivElement;
        this.canvas = this.createElement("canvas", this.container) as HTMLCanvasElement;
    }

    init(): void {
        this.toHtml0(this.html);
        this.toBody0(this.body);
        this.toContainerDiv(this.container);
        this.toArtCanvas(this.canvas);
    }

    createElement(tagName: string, parentElement: HTMLElement): HTMLElement {
        const element: HTMLElement = this.globals.document.createElement(tagName);
        parentElement.insertBefore(element, null);

        return element;
    }

    toHtml0(htmlElement: HTMLHtmlElement): void {
        const style: CSSStyleDeclaration = htmlElement.style;
        
        style.display = "block";

        style.padding = "0px";
        style.margin = "0px";
    }

    toBody0(bodyElement: HTMLBodyElement): void {
        const style: CSSStyleDeclaration = bodyElement.style;
        
        style.display = "block";

        style.padding = "0px";
        style.margin = "0px";
    }

    toContainerDiv(divElement: HTMLDivElement): void {
        const style: CSSStyleDeclaration = divElement.style;
        
        style.display = "flex";
        style.alignItems = "center";
        style.justifyContent = "center";

        style.width = "100vw";
        style.height = "100vh";
    }

    toArtCanvas(canvasElement: HTMLCanvasElement): void {
        const style: CSSStyleDeclaration = canvasElement.style;
        
        style.display = "block";

        this.sizeArtCanvas0(canvasElement);

        style.border = this.ART_CANVAS_0_BORDER_THICKNESS + "px solid black";

        this.globals.window.addEventListener("resize", () => {
            this.sizeArtCanvas0(canvasElement);
        });
    }

    sizeArtCanvas0(canvasElement: HTMLCanvasElement): void {
        const canvasLength: number = (
            this.globals.window.innerWidth < this.globals.window.innerHeight ?
                this.globals.window.innerWidth - this.ART_CANVAS_0_BORDER_THICKNESS * 2 :
                this.globals.window.innerHeight - this.ART_CANVAS_0_BORDER_THICKNESS * 2
        );
        canvasElement.height = canvasElement.width = canvasLength;
    }
}

export { Elements };