import { MathUtil } from "../utils/MathUtils";

/**
 * author: cxq
 * time: 2023/12/12 19:01:10
 * desc: 
 */
const { property, regClass } = Laya;

@regClass()
export class Player extends Laya.Script {
    declare owner: Laya.Sprite;

    velocityX: number = 0;
    velocityY: number = 0;

    @property({ type: Number, tips: "重力加速度" })
    private grav: number = -9.8;

    @property({ type: Laya.Image, tips: "icon" })
    private imgIcon: Laya.Image;
    
    private _isGround: boolean = false;

    get isGround(): boolean {
        return this._isGround;
    }

    set isGround(v: boolean) {
        this._isGround = v;
    }

    get enabledInput(): boolean {
        return this.isGround;
    }

    isBelowHeight(y: number): boolean {
        return this.owner.y >= y;
    }
    
    stop(): void {
        this.velocityX = this.velocityY = 0;
    }

    addForce(force: number, degrees: number): void {
        const radians = MathUtil.degreesToRadians(degrees);
        const velocityX = force * Math.cos(radians);
        const velocityY = force * Math.sin(radians);
        this.velocityX = velocityX;
        this.velocityY = velocityY;
    }

    onUpdate(): void {
        const delta = Laya.timer.delta * 0.001;
        this.owner.y -= this.velocityY * delta;
        if (!this.isGround) {
            this.velocityY += this.grav * delta;
        }
    }
}