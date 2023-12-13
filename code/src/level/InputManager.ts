import { Player } from "./Player";

/**
 * author: cxq
 * time: 2023/12/13 09:55:30
 * desc: 
 */
const { regClass, property } = Laya;

@regClass()
export class InputManager extends Laya.Script {
    @property({ type: Number, tips: "默认的弹跳角度" })
    private degrees: number;

    @property({ type: Number, tips: "跳跃力度增长系数" })
    private forceVelocity: number;

    @property({ type: Number, tips: "点击有效时间" })
    private maxTime: number = 0;

    @property({ type: Player })
    player: Player;

    private pressTimestamp: number = 0;

    private get isPressing(): boolean {
        return this.pressTimestamp > 0;
    }

    onKeyDown(evt: Laya.Event): void {
        if (this.isPressing) return;
        switch (evt.keyCode) {
            case Laya.Keyboard.A:
            case Laya.Keyboard.D:
                this.pressTimestamp = Date.now();
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
                pressTime = pressTime > this.maxTime ? this.maxTime : pressTime;
                let force = pressTime * this.forceVelocity * 0.001;
                this.player.addForce(force, this.degrees);
                this.pressTimestamp = 0;
                break;
            default:
                break;
        }
    }

    onKeyPress(evt: Laya.Event): void {
        switch (evt.keyCode) {
            case Laya.Keyboard.Q:
                this.player.addForce(this.forceVelocity * this.maxTime * 0.001, 180 - this.degrees);
                break;
            case Laya.Keyboard.E:
                this.player.addForce(this.forceVelocity * this.maxTime * 0.001, this.degrees);
                break;
            default:
                break;
        }
    }
}