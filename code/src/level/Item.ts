import { Player } from "./Player";

/**
 * author: cxq
 * time: 2023/12/12 21:32:32
 * desc: 
 */
const { regClass, property } = Laya;

@regClass()
export class Item extends Laya.Script {
    declare owner: Laya.Sprite;
    
    private _collisionBox: Laya.Rectangle = Laya.Rectangle.create();
    get collisionBox(): Laya.Rectangle {
        let p = Laya.Point.create();
        this.owner.localToGlobal(p);
        this._collisionBox.setTo(p.x, p.y, this.owner.width, this.owner.height);
        return this._collisionBox;
    }

    onDestroy(): void {
        this._collisionBox.recover();
        this._collisionBox = null;     
    }
}
