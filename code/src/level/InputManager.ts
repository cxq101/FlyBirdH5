export interface IInputTarget {
    enabledInput: boolean;
    onPressed(): void;
    onRelease(): void;
    onPressedCancel(): void;
}

/**
 * author: cxq
 * time: 2023/12/13 09:55:30
 * desc: 
 */
const { regClass } = Laya;

@regClass()
export class InputManager extends Laya.Script {
    private _target: IInputTarget;
    private _isPressing: boolean = false;
    
    init(target: IInputTarget): void {
        this._target = target;
    }

    cancel(): void {
        this.onMouseOut();
    }

    onMouseDown(): void {
        if (!this.enabled) return;
        if (!this._target.enabledInput || this._isPressing) return;
        this._isPressing = true;
        this._target.onPressed();
    }

    onMouseUp(): void {
        if (!this.enabled) return;
        if (!this._target.enabledInput || !this._isPressing) return;
        this._isPressing = false;
        this._target.onRelease();
    }

    onMouseOut(): void {
        if (!this.enabled) return;
        if (!this._target.enabledInput || !this._isPressing) return;
        this._isPressing = false;
        this._target.onPressedCancel();
    }
    
    onDestroy(): void {
        this._target = null;
        this._isPressing = false;
    }
}