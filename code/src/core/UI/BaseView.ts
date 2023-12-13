import { IViewKey } from "./UIInterface";

const { regClass, property } = Laya;

@regClass()
export class BaseView extends Laya.Script {
    declare owner: Laya.Sprite;
    @property({ type: Number })
    private fadeTime: number = 0;
    
    public exitAniHandler: Laya.Handler;

    private _view: Laya.Sprite;
    public key: IViewKey;
    private _viewAni: Laya.Tween = new Laya.Tween();
    private _viewAniHandler: Laya.Handler = new Laya.Handler();


    set enabledTouch(v: boolean) {
        this.owner.mouseEnabled = v;
    }

    protected enterAnim(): void {
        this.enabledTouch = false;
        this._viewAniHandler.setTo(this, this.onEnterAniCompleted, null, false);
        this._viewAni.from(this.owner, { alpha: 0 }, this.fadeTime, null, this._viewAniHandler);
    }

    public exitAnim(): void {
        this._viewAni.clear();
        this.enabledTouch = false;
        this._viewAniHandler.setTo(this, this.onExitAniCompleted, null, false);
        this._viewAni.to(this.owner, { alpha: 0 }, this.fadeTime, null, this._viewAniHandler);
    }

    protected onEnterAniCompleted(): void {
        this.enabledTouch = true;
        this._viewAni.clear();
    }

    protected onExitAniCompleted(): void {
        this.enabledTouch = true;
        this.owner.alpha = 1;
        this._viewAni.clear();
        this.exitAniHandler && this.exitAniHandler.run();
    }

    onAwake(): void {
        this._view = this.owner as Laya.Sprite;
    }

    onDestroy(): void {
        this._viewAni.clear();
        this._viewAniHandler.clear();
        this._viewAni = this._viewAniHandler = null;
    }

    initialize(): void {

    }

    show(): void {
        this._view.visible = true;
    }

    hide(): void {
        this._view.visible = false;
    }

    onEnable(): void {
        this.enterAnim();
    }

    onDisable(): void {

    }
}