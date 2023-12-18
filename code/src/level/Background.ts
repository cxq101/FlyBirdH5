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

    private startPosX: number = 0;
    private textureWidth: number = 0;

    private get distance(): number {
        return Math.abs(this.owner.x - this.startPosX);
    }

    private resetPos(): void {
        let real = this.owner.x - this.startPosX;
        this.owner.x = this.startPosX + real % this.textureWidth;
        console.log("distance------2--", this.owner.x, this.distance);
    }

    private isOutOfBounds(): boolean {
        return this.distance * this.repeatX > this.owner.width;
    }

    onStart(): void {
        this.startPosX = this.owner.x;
        this.textureWidth = this.owner.width / this.repeatX;
    }

    move(distance: number): void {
        this.owner.x += distance * this.moveScale;
        console.log("distance------1--", this.owner.x, this.distance);
        if (this.isOutOfBounds()) {
            this.resetPos();
        }
    }
}