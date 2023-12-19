/**
 * author: cxq
 * time: 2023/12/12 21:32:32
 * desc: 
 */
const { regClass, property } = Laya;

@regClass()
export class Item extends Laya.Script {
    declare owner: Laya.Sprite;
    
    getGlobalCollisionRange(): [number, number] {
        let p = Laya.Point.create();
        this.owner.localToGlobal(p);
        return [p.x, p.x + this.owner.width];
    }
}
