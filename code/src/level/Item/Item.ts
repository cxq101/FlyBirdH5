import { EItemType } from "./EItemType";

/**
 * author: cxq
 * time: 2023/12/12 21:32:32
 * desc: 
 */
const { regClass, classInfo, property } = Laya;

@regClass()
@classInfo({ menu: "Level_Item", caption: "Item" })
export class Item extends Laya.Script {
    @property({ type: EItemType })
    public type: EItemType = EItemType.Item;
    declare owner: Laya.Sprite;

    protected _collisionBox: Laya.Rectangle = Laya.Rectangle.create();
    get collisionBox(): Laya.Rectangle {
        let p = Laya.Point.create();
        this.owner.localToGlobal(p);
        this._collisionBox.setTo(p.x, p.y, this.owner.width, this.owner.height);
        return this._collisionBox;
    }

    collisionEvent(): void {

    }

    onDestroy(): void {
        this._collisionBox.recover();
        this._collisionBox = null;
    }
}
