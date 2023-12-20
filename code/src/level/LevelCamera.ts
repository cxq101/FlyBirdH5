import { LevelModel } from "../views/level/LevelModel";

/**
 * author: cxq
 * time: 2023/12/13 08:48:23
 * desc: 
 */
export interface ICameraFocusTarget {
    velocityX: number;
}

export interface ICameraFollower {
    move(distance: number): void;
}

const { regClass, property } = Laya;

@regClass()
export class LevelCamera extends Laya.Script {
    declare owner: Laya.Sprite;

    private _followers: ICameraFollower[];
    private _focusTarget: ICameraFocusTarget;
    
    init(target: ICameraFocusTarget): void {
        this._followers = [];
        this._focusTarget = target;
    }

    backToStart(): void {
        const distance = LevelModel.ins.currLevelDistance;
        this._followers.forEach(follow => follow.move(distance));
        LevelModel.ins.resetDistance();
    }

    addFollower(f: ICameraFollower): void {
        this._followers.push(f);
    }

    isInit(): boolean {
        return this._focusTarget != null;
    }
    
    onUpdate(): void {
        if (!this.isInit()) return;
        const delta = Laya.timer.delta * 0.001;
        let distance = this._focusTarget.velocityX * delta;
        if (distance == 0) return;
        LevelModel.ins.moveDistance(distance);
        this._followers.forEach(follow => follow.move(-distance));
    }

    onDestroy(): void {
        LevelModel.ins.resetDistance();
        this._followers = this._focusTarget = null;
    }
}