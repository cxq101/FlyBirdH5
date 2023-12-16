/**
 * author: cxq
 * time: 2023/12/16 10:51:31
 * desc: 
 */
const { regClass, classInfo, property } = Laya;

@regClass()
@classInfo({ menu: "UI" })
export class ClickZoom extends Laya.Script {
    @property({ type: Number, tips: "缩放动画时间" })
    private duration: number = 100;

    @property({ type: Number, tips: "相较初始值缩放的比例" })
    private scale: number = 0.9;

    @property({ type: Boolean, tips: "要求锚点必须居中，否则不做缩放效果" })
    isAnchorCenterRequired: boolean = true;

    declare owner: Laya.Sprite;

    private _scaleX: number;
    private _scaleY: number;
    private _tween: Laya.Tween;
    private _isZooming: boolean;

    private onOutOrUp(): void {
        if (!this._isZooming) return;
        this._tween.to(this.owner, { scaleX: this._scaleX, scaleY: this._scaleY }, this.duration);
    }

    private get isAnchorCenter(): boolean {
        return this.owner.anchorX == 0.5 && this.owner.anchorY == 0.5;
    }

    onStart(): void {
        this._tween = new Laya.Tween();
        this._scaleX = this.owner.scaleX;
        this._scaleY = this.owner.scaleY;
    }

    onDestroy(): void {
        this._tween.clear();
        this._tween = null;
    }

    onMouseUp(evt: Laya.Event): void { this.onOutOrUp(); }

    onMouseOut(evt: Laya.Event): void { this.onOutOrUp(); }

    onMouseDown(evt: Laya.Event): void {
        if (this.isAnchorCenterRequired && !this.isAnchorCenter) {
            console.warn("ClickZoom owner anchor is not center", this.owner.anchorX, this.owner.anchorX);
            return;
        }
        this._isZooming = true;
        const scale = this.scale;
        const scaleX = this._scaleX * scale;
        const scaleY = this._scaleY * scale;
        this._tween.to(this.owner, { scaleX, scaleY }, this.duration);
    }
}
