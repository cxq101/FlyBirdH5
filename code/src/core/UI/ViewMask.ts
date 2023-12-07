/**
 * view 黑色背景
 * 1.防止点击穿透
 * 2.点击界面外回调
 * 3.遮罩的样式由用户决定
 */
export class ViewMask {
    private _mask: Laya.Sprite;
    private _hitArea: Laya.Sprite;

    private onResize() {
        const w = Laya.stage.width >> 0;
        const h = Laya.stage.height >> 0;
        this._mask.size(w, h);
        this._mask.graphics.clear();
        this._mask.graphics.drawRect(0, 0, w, h, "#0000ff");
    }

    private onClick(): void {
        console.log("viewmask======= onclick");
    }

    private initArea(): void {
        this._hitArea = new Laya.Sprite();
        let hitArea = new Laya.HitArea();
        // 暂时用比较大的 可以考虑onresize
        hitArea.hit.drawRect(-5000, -5000, 10000, 10000, "#ffffff");
        this._hitArea.hitArea = hitArea;
        this._hitArea.mouseEnabled = true;
        this._hitArea.mouseThrough = false;
        this._hitArea.on(Laya.Event.CLICK, this, this.onClick);
    }

    show(root: Laya.Sprite, index: number, mouseEnabled: boolean, alpha: number = 0.8): void {
        if (!this._mask) {
            this._mask = new Laya.Sprite();
            this.initArea();
        }
        root.addChildAt(this._mask, index);
        root.addChildAt(this._hitArea, index);
        this.onResize();
        this._mask.alpha = alpha;
        this._hitArea.mouseEnabled = mouseEnabled;
        Laya.stage.off(Laya.Event.RESIZE, this, this.onResize);
        Laya.stage.on(Laya.Event.RESIZE, this, this.onResize);
    }

    hide(): void {
        this._mask.removeSelf();
        this._hitArea.removeSelf();
        Laya.stage.off(Laya.Event.RESIZE, this, this.onResize);
    }
}