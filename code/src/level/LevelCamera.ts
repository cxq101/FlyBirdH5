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

    private _totalDistance: number = 0;
    private _followers: ICameraFollower[];
    private _focusTarget: ICameraFocusTarget;
    
    get totalDistance(): number {
        return this._totalDistance;
    }

    init(target: ICameraFocusTarget): void {
        this._followers = [];
        this._focusTarget = target;
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
        this._totalDistance += distance;
        this._followers.forEach(follow => follow.move(-distance));
    }
}