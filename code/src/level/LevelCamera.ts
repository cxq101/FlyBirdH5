import { CameraFollower } from "./CameraFollower";

/**
 * author: cxq
 * time: 2023/12/13 08:48:23
 * desc: 
 */
export interface ICameraFocusTarget {
    velocityX: number;
}

const { regClass, property } = Laya;

@regClass()
export class LevelCamera extends Laya.Script {
    declare owner: Laya.Sprite;

    @property({ type: [CameraFollower] })
    private followers: CameraFollower[] = [];
    private _focusTarget: ICameraFocusTarget;

    public distance: number = 0;

    public get moveToValue() : number {
        return this.distance;
    }

    public set moveToValue(v : number) {
        this.moveTo(v);
    }
    
    private isInit(): boolean {
        return this._focusTarget != null;
    }

    private moveTo(pos: number): void {
        this.moveBy(pos - this.distance);
    }

    private moveBy(distance: number): void {
        this.distance += distance;
        this.followers.forEach(follow => follow.move(-distance));
    }

    private onScrollCompleted(handler: Laya.Handler): void {
        handler && handler.run();
    }
    
    init(target: ICameraFocusTarget): void {
        this._focusTarget = target;
    }

    backToStart(): void {
        this.moveBy(-this.distance);
    }

    scrollTo(pos: number, scrollCompleted?: Laya.Handler): void {
        Laya.Tween.to(this, { moveToValue: pos }, 800, Laya.Ease.expoIn, Laya.Handler.create(this, this.onScrollCompleted, [scrollCompleted]));
    }

    addFollower(f: CameraFollower): void {
        this.followers.push(f);
    }

    onUpdate(): void {
        if (!this.isInit()) return;
        const delta = Laya.timer.delta * 0.001;
        let distance = this._focusTarget.velocityX * delta;
        if (distance == 0) return;
        this.moveBy(distance);
    }

    onDestroy(): void {
        this.followers = this._focusTarget = null;
    }
}