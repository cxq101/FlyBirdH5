/**
 * author: cxq
 * time: 2023/12/12 15:22:31
 * desc: 背景视差移动
 */
const { regClass, property } = Laya;

@regClass()
export class Background extends Laya.Script {
    declare owner: Laya.Sprite;

    @property({ type: Number, tips: "移动速度" })
    velocity: number = 0;

    @property({ type: Number, tips: "移动视差比例" })
    velocityScale: number = 1;

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
    }

    private isOutOfBounds(): boolean {
        return this.distance * this.repeatX > this.owner.width;
    }

    onStart(): void {
        this.startPosX = this.owner.x;
        this.textureWidth = this.owner.width / this.repeatX;
    }

    onUpdate(): void {
        this.owner.x += this.velocity * this.velocityScale * Laya.timer.delta * 0.001;
        if (this.isOutOfBounds()) {
            this.resetPos();
        }
    }
}