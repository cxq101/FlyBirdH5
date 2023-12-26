/**
 * author: cxq
 * time: 2023/12/12 15:22:31
 * desc: 背景视差移动
 * MTC
 * todo:
 * 1.屏幕宽度适应问题
 */
const { regClass, property } = Laya;

@regClass()
export class Background extends Laya.Script {
    declare owner: Laya.Sprite;

    @property({ type: Number, tips: "移动视差比例" })
    moveScale: number = 1;

    /** 初始宽度为原始宽度的3倍 */
    private readonly repeatX: number = 3;
    private readonly textureWidth: number = 720;

    private startPosX: number = 0;

    private get distance(): number {
        return Math.abs(this.owner.x - this.startPosX);
    }

    private resetPos(): void {
        let real = this.owner.x - this.startPosX;
        this.owner.x = this.startPosX + real % this.textureWidth;
    }

    private isOutOfBounds(): boolean {
        return this.distance * this.repeatX > this.textureWidth;
    }

    onStart(): void {
        const stageW = Laya.stage.width;
        this.owner.x = -stageW;
        this.owner.width = stageW * this.repeatX;
        this.startPosX = this.owner.x;
    }

    move(distance: number): void {
        this.owner.x += distance * this.moveScale;
        if (this.isOutOfBounds()) {
            this.resetPos();
        }
    }
}