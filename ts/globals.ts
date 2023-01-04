class Globals {

    window: Window;
    console: Console;
    document: Document;

    math: Math;

    constructor() {
        this.window = window;
        this.console = console;
        this.document = document;

        this.math = Math;
    }

    init(): void {
        
    }    
}

export { Globals };