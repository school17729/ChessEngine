class Keyboard {
    constructor(globals) {
        this.globals = globals;
        this.a = false;
        this.b = false;
        this.c = false;
        this.d = false;
        this.e = false;
        this.f = false;
        this.g = false;
        this.h = false;
        this.i = false;
        this.j = false;
        this.k = false;
        this.l = false;
        this.m = false;
        this.n = false;
        this.o = false;
        this.p = false;
        this.q = false;
        this.r = false;
        this.s = false;
        this.t = false;
        this.u = false;
        this.v = false;
        this.w = false;
        this.x = false;
        this.y = false;
        this.z = false;
    }
    init() {
        this.globals.window.addEventListener("keydown", this.keydown.bind(this));
        this.globals.window.addEventListener("keyup", this.keyup.bind(this));
    }
    keydown(e) {
        if (e.key === "a") {
            this.a = true;
        }
        else if (e.key === "b") {
            this.b = true;
        }
        else if (e.key === "c") {
            this.c = true;
        }
        else if (e.key === "d") {
            this.d = true;
        }
        else if (e.key === "e") {
            this.e = true;
        }
        else if (e.key === "f") {
            this.f = true;
        }
        else if (e.key === "g") {
            this.g = true;
        }
        else if (e.key === "h") {
            this.h = true;
        }
        else if (e.key === "i") {
            this.i = true;
        }
        else if (e.key === "j") {
            this.j = true;
        }
        else if (e.key === "k") {
            this.k = true;
        }
        else if (e.key === "l") {
            this.l = true;
        }
        else if (e.key === "m") {
            this.m = true;
        }
        else if (e.key === "n") {
            this.n = true;
        }
        else if (e.key === "o") {
            this.o = true;
        }
        else if (e.key === "p") {
            this.p = true;
        }
        else if (e.key === "q") {
            this.q = true;
        }
        else if (e.key === "r") {
            this.r = true;
        }
        else if (e.key === "s") {
            this.s = true;
        }
        else if (e.key === "t") {
            this.t = true;
        }
        else if (e.key === "u") {
            this.u = true;
        }
        else if (e.key === "v") {
            this.v = true;
        }
        else if (e.key === "w") {
            this.w = true;
        }
        else if (e.key === "x") {
            this.x = true;
        }
        else if (e.key === "y") {
            this.y = true;
        }
        else if (e.key === "z") {
            this.z = true;
        }
    }
    keyup(e) {
        if (e.key === "a") {
            this.a = false;
        }
        else if (e.key === "b") {
            this.b = false;
        }
        else if (e.key === "c") {
            this.c = false;
        }
        else if (e.key === "d") {
            this.d = false;
        }
        else if (e.key === "e") {
            this.e = false;
        }
        else if (e.key === "f") {
            this.f = false;
        }
        else if (e.key === "g") {
            this.g = false;
        }
        else if (e.key === "h") {
            this.h = false;
        }
        else if (e.key === "i") {
            this.i = false;
        }
        else if (e.key === "j") {
            this.j = false;
        }
        else if (e.key === "k") {
            this.k = false;
        }
        else if (e.key === "l") {
            this.l = false;
        }
        else if (e.key === "m") {
            this.m = false;
        }
        else if (e.key === "n") {
            this.n = false;
        }
        else if (e.key === "o") {
            this.o = false;
        }
        else if (e.key === "p") {
            this.p = false;
        }
        else if (e.key === "q") {
            this.q = false;
        }
        else if (e.key === "r") {
            this.r = false;
        }
        else if (e.key === "s") {
            this.s = false;
        }
        else if (e.key === "t") {
            this.t = false;
        }
        else if (e.key === "u") {
            this.u = false;
        }
        else if (e.key === "v") {
            this.v = false;
        }
        else if (e.key === "w") {
            this.w = false;
        }
        else if (e.key === "x") {
            this.x = false;
        }
        else if (e.key === "y") {
            this.y = false;
        }
        else if (e.key === "z") {
            this.z = false;
        }
    }
}
export { Keyboard };
