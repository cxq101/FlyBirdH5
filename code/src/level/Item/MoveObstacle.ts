import { Obstacle } from "./Obstacle";

/**
 * author: cxq
 * time: 2023/12/12 21:32:32
 * desc: 
 */
const { regClass, classInfo, property } = Laya;

@regClass()
@classInfo({ menu: "Level_Item", caption: "MoveObstacle" })
export class MoveObstacle extends Obstacle {
    declare owner: Laya.Sprite;
    @property({ type: Laya.Image, tips: "移动节点" })
    moveImage: Laya.Image;

    @property({ type: Number, tips: "移动高度" })
    moveHight: number = 100;

    @property({ type: Number, tips: "移动高度" })
    moveDuration: number = 1000;

    @property({ type: Number, tips: "中间停顿的时间" })
    delayDuration: number = 1000;

    private _startY: number;
    private _timeLine: Laya.TimeLine;

    get collisionBox(): Laya.Rectangle {
        let p = Laya.Point.create();
        this.moveImage.localToGlobal(p);
        this._collisionBox.setTo(p.x, p.y, this.owner.width, this.owner.height);
        return this._collisionBox;
    }

    onAwake(): void {
        this._startY = this.moveImage.y;
        const { moveHight, moveDuration, delayDuration } = this;
        let fromY = this._startY;
        let toY = fromY - moveHight;
        this._timeLine = new Laya.TimeLine();
        this._timeLine.to(this.moveImage, { y: toY }, moveDuration);
        this._timeLine.to(this.moveImage, { y: fromY }, moveDuration);
        this._timeLine.to(this.moveImage, { }, delayDuration);
    }

    onEnable(): void {
        this._timeLine.play(0, true);
    }

    onDisable(): void {
        this._timeLine.pause();
        this.moveImage.y = this._startY;
    }

    onDestroy(): void {
        this._timeLine.destroy();
        this._timeLine = null;
    }
}
