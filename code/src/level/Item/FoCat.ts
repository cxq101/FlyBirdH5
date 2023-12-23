import { Item } from "./Item";

/**
 * author: cxq
 * time: 2023/12/23 11:23:34
 * desc: 
 */
const { regClass, classInfo, property } = Laya;

@regClass()
@classInfo({ menu: "Level_Item", caption: "FoCat" })
export class FoCat extends Item {
    @property({ type: Laya.Label })
    private lblDesc: Laya.Label;

    @property({ type: Laya.Image })
    private imgDialog: Laya.Image;
    
    @property({ type: Laya.Box, tips: "碰撞检测范围" })
    private collisionBoxNode: Laya.Box;
    
    private _hideTime = 0;
    private _isShowing: boolean = false;
    
    get collisionBox(): Laya.Rectangle {
        let p = Laya.Point.create();
        this.collisionBoxNode.localToGlobal(p);
        this._collisionBox.setTo(p.x, p.y, this.collisionBoxNode.width, this.collisionBoxNode.height);
        return this._collisionBox;
    }

    private showRandomDialog(): void {
        this._isShowing = true;
        this.imgDialog.alpha = 1;
        this.imgDialog.visible = true;
        Laya.Tween.from(this.imgDialog, { alpha: 0 }, 300);
    }

    private hideRandomDialog(): void {
        Laya.Tween.to(this.imgDialog, { alpha: 0 }, 300);
    }

    collisionEvent(): void {
        this._hideTime = 1000;
        if (this._isShowing) return;
        this.showRandomDialog();
    }

    onUpdate(): void {
        if (this._hideTime > 0) {
            this._hideTime -= Laya.timer.delta;
        } else {
            if (this._isShowing) {
                this._hideTime = 0;
                this._isShowing = false;
                this.hideRandomDialog();
            }
        }
    }   
}   