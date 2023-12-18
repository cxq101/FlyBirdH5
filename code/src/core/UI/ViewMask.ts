import { BaseView } from "./BaseView";

/**
 * TODO
 * view 黑色背景
 * 1.点击界面外回调
 * 2.遮罩的样式由用户决定
 * 3.消失动画
 */
export class ViewMask {
    private _view: BaseView;
    private _mask: Laya.Sprite;
    private _hitArea: Laya.Sprite;

    private onResize() {
        const w = Laya.stage.width >> 0;
        const h = Laya.stage.height >> 0;
        this._mask.size(w, h);
        this._mask.graphics.clear();
        this._mask.graphics.drawRect(0, 0, w, h, "#000000");
    }

    private onClick(): void {
        this._view.onClickExtra();
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

    show(view: BaseView, alpha: number = 0.8): void {
        this._view = view;
        let parent = view.owner.parent as Laya.Sprite;
        let index = parent.getChildIndex(view.owner);

        if (!this._mask) {
            this._mask = new Laya.Sprite();
        }
        parent.addChildAt(this._mask, index);
        this.onResize();
        this._mask.alpha = alpha;
        Laya.stage.off(Laya.Event.RESIZE, this, this.onResize);
        Laya.stage.on(Laya.Event.RESIZE, this, this.onResize);
    }

    hide(): void {
        this._view = null;
        this._mask.removeSelf();
        Laya.stage.off(Laya.Event.RESIZE, this, this.onResize);
    }

    openExtraClick(view: BaseView): void {
        this._view = view;
        if (!this._hitArea) {
            this.initArea();
        }
        let parent = view.owner.parent as Laya.Sprite;
        let index = parent.getChildIndex(view.owner);
        parent.addChildAt(this._hitArea, index);
    }
    
    closeExtraClick(): void {
        this._view = null;
        this._hitArea.removeSelf();
    }
}