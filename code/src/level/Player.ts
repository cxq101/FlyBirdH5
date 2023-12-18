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
    
    private startPosY: number = 0;

    get isGround(): boolean {
        return this.owner.y >= this.startPosY;
    }

    get enabledInput(): boolean {
        return this.isGround;
    }

    addForce(force: number, degrees: number): void {
        const radians = MathUtil.degreesToRadians(degrees);
        const velocityX = force * Math.cos(radians);
        const velocityY = force * Math.sin(radians);
        this.velocityX = velocityX;
        this.velocityY = velocityY;
    }

    onStart(): void {
        this.startPosY = this.owner.y;
    }

    onUpdate(): void {
        if (this.velocityX === 0 && this.velocityY === 0) return;
        const delta = Laya.timer.delta * 0.001;
        this.owner.y -= this.velocityY * delta;
        this.owner.y = Math.min(this.owner.y, this.startPosY);
        this.velocityY += this.grav * delta;
        this.isGround && (this.velocityX = this.velocityY = 0);
    }
}