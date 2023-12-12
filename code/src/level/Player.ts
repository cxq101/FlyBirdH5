import { MathUtil } from "../utils/MathUtils";
import { Background } from "./Background";

/**
 * author: cxq
 * time: 2023/12/12 19:01:10
 * desc: 
 */
const { property, regClass } = Laya;

@regClass()
export class Player extends Laya.Script {
    declare owner: Laya.Sprite;

    @property({ type: Number, tips: "默认的弹跳角度" })
    private degrees: number;

    @property({ type: Number, tips: "跳跃力度增长系数" })
    private forceVelocity: number;

    @property({ type: Number, tips: "点击有效时间" })
    private maxTime: number = 0;

    @property({ type: Number, tips: "重力加速度" })
    private grav: number = -9.8;
    
    @property({ type: [Background] })
    private backgrounds: Background[];

    private startPosY: number = 0;

    private pressTimestamp: number = 0;

    private _velocityX: number = 0;

    private velocityY: number = 0;

    private get isPressing(): boolean {
        return this.pressTimestamp > 0;
    }

    private set velocityX(v: number) {
        this._velocityX = v;
        this.onVelocityXChanged(v);
    }

    private addForce(force: number): void {
        const radians = MathUtil.degreesToRadians(this.degrees);
        this.velocityX = force * Math.cos(radians);
        this.velocityY = force * Math.sin(radians);
    }


    private onVelocityXChanged(v: number): void {
        this.backgrounds.forEach(bg => {
            bg.velocity = -v;
        })
    }

    onStart(): void {
        this.startPosY = this.owner.y;
    }

    onUpdate(): void {
        if (this.velocityX === 0 && this.velocityY === 0) return;
        const delta = Laya.timer.delta * 0.001;
        this.owner.y -= this.velocityY * delta;
        this.velocityY += this.grav * delta;
        if (this.owner.y > this.startPosY) {
            this.velocityX = this.velocityY = 0;
        }
    }
    
    onKeyDown(evt: Laya.Event): void {
        if (this.isPressing) return;
        switch (evt.keyCode) {
            case Laya.Keyboard.A:
            case Laya.Keyboard.D:
                this.pressTimestamp = Date.now();
                console.log("pressTime========down=", this.pressTimestamp);
                break;
            default:
                break;
        }
    }

    onKeyUp(evt: Laya.Event): void {
        if (!this.isPressing) return;
        switch (evt.keyCode) {
            case Laya.Keyboard.A:
            case Laya.Keyboard.D:
                let pressTime = Date.now() - this.pressTimestamp;
                console.log("pressTime=======up==", pressTime);
                pressTime = pressTime > this.maxTime ? this.maxTime : pressTime;
                let force = pressTime * this.forceVelocity * 0.001;
                this.addForce(force);
                this.pressTimestamp = 0;
                break;
            default:
                break;
        }

    }
}