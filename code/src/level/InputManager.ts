export interface IInputTarget {
    enabledInput: boolean;
    addForce(force: number, degrees: number): void;
}

/**
 * author: cxq
 * time: 2023/12/13 09:55:30
 * desc: 
 */
const { regClass, property } = Laya;

@regClass()
export class InputManager extends Laya.Script {
    @property({ type: Number, tips: "默认的弹跳角度" })
    private degrees: number = 35;

    @property({ type: Number, tips: "跳跃力度增长系数" })
    private forceVelocity: number = 800;

    @property({ type: Number, tips: "点击有效时间" })
    private maxTime: number = 1800;

    @property({ type: Number, tips: "最小促发力度" })
    private minForce: number = 250;

    private _target: IInputTarget;

    private pressTimestamp: number = 0;

    private get isPressing(): boolean {
        return this.pressTimestamp > 0;
    }
    
    init(target: IInputTarget): void {
        this._target = target;
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onStageMouseUp);
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onStageMouseDown);
    }

    hasTarget(): boolean {
        return this._target != null;
    }

    onKeyDown(evt: Laya.Event): void {
        if (!this._target.enabledInput || this.isPressing) return;
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
        if (!this._target.enabledInput || !this.isPressing) return;
        switch (evt.keyCode) {
            case Laya.Keyboard.A:
            case Laya.Keyboard.D:
                let pressTime = Date.now() - this.pressTimestamp;
                pressTime = pressTime > this.maxTime ? this.maxTime : pressTime;
                let force = pressTime * this.forceVelocity * 0.001;
                force = Math.max(force, this.minForce); 
                this._target.addForce(force, this.degrees);
                this.pressTimestamp = 0;
                break;
            default:
                break;
        }
    }

    onKeyPress(evt: Laya.Event): void {
        switch (evt.keyCode) {
            case Laya.Keyboard.Q:
                this._target.addForce(this.forceVelocity * this.maxTime * 0.001, 180 - this.degrees);
                break;
            case Laya.Keyboard.E:
                this._target.addForce(this.forceVelocity * this.maxTime * 0.001, this.degrees);
                break;
            default:
                break;
        }
    }

    onStageMouseDown(evt: Laya.Event): void {
        if (!this._target.enabledInput || this.isPressing) return;
        this.pressTimestamp = Date.now();
    }

    onStageMouseUp(evt: Laya.Event): void {
        if (!this._target.enabledInput || !this.isPressing) return;
        let pressTime = Date.now() - this.pressTimestamp;
        pressTime = pressTime > this.maxTime ? this.maxTime : pressTime;
        let force = pressTime * this.forceVelocity * 0.001;
        force = Math.max(force, this.minForce); 
        this._target.addForce(force, this.degrees);
        this.pressTimestamp = 0;
    }

    onDestroy(): void {
        this._target = null;
        this.pressTimestamp = 0;
        Laya.stage.off(Laya.Event.MOUSE_UP, this, this.onStageMouseUp);
        Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.onStageMouseDown);
    }
}