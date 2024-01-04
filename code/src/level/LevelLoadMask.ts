/**
 * author: cxq
 * time: 2024/01/04 14:43:11
 * desc: 
 */
const { regClass, property } = Laya;

@regClass()
export class LevelLoadMask extends Laya.Script {
    declare owner: Laya.Sprite;   

    @property({ type: Laya.Box, tips: "mask Node" })
    private maskBox: Laya.Box;
    
    @property({ type: Laya.Sprite, tips: "left Node" })
    private leftSp: Laya.Sprite;
    
    @property({ type: Laya.Sprite, tips: "left Node" })
    private rightSp: Laya.Sprite;
    
    @property({ type: Number, tips: "过度动画时间" })
    private fadeTime: number = 200;
    
    private _groupHandler: Laya.Handler;
    private _ungroupHandler: Laya.Handler;

    onStart(): void {
        const { width, height } = Laya.stage;
        const half = width / 2;
        this.owner.x = half;
        this.leftSp.x = -half;
        this.rightSp.x = half;
        this.maskBox.size(width, height);
        this.maskBox.mouseEnabled = false;
    }

    pingpong(): void {
        this.group(Laya.Handler.create(this, this.ungroup));
    }

    group(handler?: Laya.Handler): void {
        const halfScreenWidth = Laya.stage.width / 2;
        const fadeTime = this.fadeTime;
        this._groupHandler = handler;
        this.leftSp.x = -halfScreenWidth;
        this.rightSp.x = halfScreenWidth;
        Laya.Tween.clearAll(this.leftSp);
        Laya.Tween.clearAll(this.rightSp);
        this.maskBox.mouseEnabled = true;
        Laya.Tween.to(this.leftSp, { x: 280 }, fadeTime, Laya.Ease.expoOut, Laya.Handler.create(this, () => {
            this._groupHandler && this._groupHandler.run();
            this.maskBox.mouseEnabled = false;
        }));
        Laya.Tween.to(this.rightSp, { x: -280 }, fadeTime, Laya.Ease.expoOut, Laya.Handler.create(this, () => {
        }));
    }

    ungroup(handler?: Laya.Handler): void {
        const halfScreenWidth = Laya.stage.width / 2;
        const fadeTime = this.fadeTime;
        this._ungroupHandler = handler;
        this.leftSp.x = 280;
        this.rightSp.x = -280;
        Laya.Tween.clearAll(this.leftSp);
        Laya.Tween.clearAll(this.rightSp);
        this.maskBox.mouseEnabled = true;
        Laya.Tween.to(this.leftSp, { x: -halfScreenWidth }, fadeTime, Laya.Ease.linearOut, Laya.Handler.create(this, () => {
            this._ungroupHandler && this._ungroupHandler.run();
            this.maskBox.mouseEnabled = false;
        }), 200);
        // 延迟200秒 不然会有ui的黑底闪烁
        Laya.Tween.to(this.rightSp, { x: halfScreenWidth }, fadeTime, Laya.Ease.linearOut, Laya.Handler.create(this, () => {
        }), 200);
    }

    onDestroy(): void {
        Laya.Tween.clearAll(this.leftSp);
        Laya.Tween.clearAll(this.rightSp);
        this._groupHandler = this._ungroupHandler = null;
    }
}