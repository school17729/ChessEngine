import { Globals } from "./globals.js";
import { Resources } from "./resources.js";
import { StandardContext } from "./standardContext.js";

import { Constants } from "./constants.js";

import { GlobalInstances } from "./globalInstances.js";

import { Position } from "./position.js";
import { Velocity } from "./velocity.js";
import { Move } from "./move.js";
import { Board } from "./board.js";
import { PlayerColor } from "./playerColor.js";
import { PieceType } from "./pieceType.js";
import { InvalidMove } from "./invalidMove.js";

class Piece {
    globals: Globals;
    console: Console;
    resources: Resources;
    sctx: StandardContext;
    globalInstances: GlobalInstances;

    constants: Constants;
    
    position: Position;
    canvasPosition: Position;

    type: PieceType;
    color: PlayerColor;
    captured: boolean;
    moveCount: number;

    moving: boolean;
    movingMove: Move;
    movingFrames: number;
    movingVelocity: Velocity;

    valid: boolean;

    constructor(globalInstances: GlobalInstances, type: PieceType, color: PlayerColor, position: Position, valid: boolean) {
        this.globals = globalInstances.globals;
        this.console = this.globals.console;
        this.resources = globalInstances.resources;
        this.sctx = globalInstances.sctx;
        this.globalInstances = globalInstances;

        this.constants = globalInstances.constants;

        this.position = position;
        this.canvasPosition = position.multiply(this.constants.tileSize);

        this.type = type;
        this.color = color;
        this.captured = false;
        this.moveCount = 0;

        this.moving = false;
        this.movingMove = new InvalidMove();
        this.movingFrames = 0;
        this.movingVelocity = new Velocity(0, 0);

        this.valid = valid;
    }

    loop(): void {
        if (this.constants.smoothPieceMovement) {
            if (this.moving) {
                if (this.movingFrames < this.constants.pieceMoveDuration) {
                    this.canvasPosition = new Position(this.canvasPosition.x + this.movingVelocity.x, this.canvasPosition.y + this.movingVelocity.y);
                    this.movingFrames++;
                } else {
                    this.moving = false;
                    this.position = this.movingMove.newPosition;
                    this.canvasPosition = this.position.multiply(this.constants.tileSize);
                }
            }
        }
    }

    draw(): void {
        
    }

    moveBase(move: Move): void {
        if (this.constants.smoothPieceMovement) {
            this.moving = true;
            this.movingMove = move;
            this.movingFrames = 0;
            const stepX: number = ((this.movingMove.newPosition.x * this.constants.tileSize) - this.canvasPosition.x) / this.constants.pieceMoveDuration;
            const stepY: number = ((this.movingMove.newPosition.y * this.constants.tileSize) - this.canvasPosition.y) / this.constants.pieceMoveDuration;
            this.movingVelocity = new Velocity(stepX, stepY);
        } else {
            this.moving = false;
            this.position = move.newPosition.clone();
            this.canvasPosition = this.position.multiply(this.constants.tileSize);
        }
        this.moveCount++;
    }
    
    move(move: Move): void {
        this.moveBase(move);
    }
}

export { Piece };