export interface IInputTarget {
    enabledInput: boolean;
    onPressed(): void;
    onRelease(): void;
}

/**
 * author: cxq
 * time: 2023/12/13 09:55:30
 * desc: 
 */
const { regClass, property } = Laya;

@regClass()
export class InputManager extends Laya.Script {
    private _target: IInputTarget;
    private _isPressing: boolean = false;
    
    init(target: IInputTarget): void {
        this._target = target;
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onStageMouseUp);
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onStageMouseDown);
    }

    // onKeyDown(evt: Laya.Event): void {
    //     if (!this._target.enabledInput || this.isPressing) return;
    //     switch (evt.keyCode) {
    //         case Laya.Keyboard.A:
    //         case Laya.Keyboard.D:
    //             this.pressTimestamp = Date.now();
    //             break;
    //         default:
    //             break;
    //     }
    // }

    // onKeyUp(evt: Laya.Event): void {
    //     if (!this._target.enabledInput || !this.isPressing) return;
    //     switch (evt.keyCode) {
    //         case Laya.Keyboard.A:
    //         case Laya.Keyboard.D:
    //             let pressTime = Date.now() - this.pressTimestamp;
    //             pressTime = pressTime > this.maxTime ? this.maxTime : pressTime;
    //             let force = pressTime * this.forceVelocity * 0.001;
    //             force = Math.max(force, this.minForce); 
    //             this._target.addForce(force, this.degrees);
    //             this.pressTimestamp = 0;
    //             break;
    //         default:
    //             break;
    //     }
    // }

    // onKeyPress(evt: Laya.Event): void {
    //     switch (evt.keyCode) {
    //         case Laya.Keyboard.Q:
    //             this._target.addForce(this.forceVelocity * this.maxTime * 0.001, 180 - this.degrees);
    //             break;
    //         case Laya.Keyboard.E:
    //             this._target.addForce(this.forceVelocity * this.maxTime * 0.001, this.degrees);
    //             break;
    //         default:
    //             break;
    //     }
    // }

    onStageMouseDown(evt: Laya.Event): void {
        if (!this._target.enabledInput || this._isPressing) return;
        this._isPressing = true;
        this._target.onPressed();
    }

    onStageMouseUp(evt: Laya.Event): void {
        if (!this._target.enabledInput || !this._isPressing) return;
        this._isPressing = false;
        this._target.onRelease();
    }

    onDestroy(): void {
        this._target = null;
        this._isPressing = false;
        Laya.stage.off(Laya.Event.MOUSE_UP, this, this.onStageMouseUp);
        Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.onStageMouseDown);
    }
}