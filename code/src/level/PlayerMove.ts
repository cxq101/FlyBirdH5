import { MathUtil } from "../utils/MathUtils";
import { SkinModel } from "../views/skin/SkinModel";

/**
 * author: cxq
 * time: 2023/12/12 19:01:10
 * desc: 
 */
const { property, regClass } = Laya;

@regClass()
export class PlayerMove extends Laya.Script {
    declare owner: Laya.Sprite;

    @property({ type: Number, tips: "水平移动速度" })
    private velocityX: number = 400;

    @property({ type: Number, tips: "垂直移动起始速度" })
    private velocityY: number = -600;

    @property({ type: Number, tips: "重力加速度" })
    private grav: number = 1200;

    private _velocityX: number = 0;
    private _velocityY: number = 0;
    
    onUpdate(): void {
        this.move();
    }

    stop(): void {
        this.velocityX = this._velocityY = 0;
    }

    isGround(): boolean {
        return this.owner.y >= 758;
    }

    move(): void {
        const delta = Laya.timer.delta * 0.001;
        this.owner.x += this._velocityX * delta;
        this.owner.y += this._velocityY * delta;
        if (!this.isGround()) {
            this._velocityY += this.grav * delta;
        } else {
            this.owner.y = 758;
            this.stop();
        }
    }

    // for test
    onKeyPress(evt: Laya.Event): void {
        if (evt.keyCode === Laya.Keyboard.A) {
            this._velocityX = -this.velocityX;        
        } else if (evt.keyCode === Laya.Keyboard.D) {
            this._velocityX = this.velocityX;        
        }
        if (evt.keyCode === Laya.Keyboard.SPACE) {
            this._velocityY = this.velocityY;      
            this._velocityX = this.velocityX;        
        }
    }

    onKeyUp(evt: Laya.Event): void {
        if (evt.keyCode === Laya.Keyboard.A || evt.keyCode === Laya.Keyboard.D) {
            this._velocityX = 0;
        }
    }
 }