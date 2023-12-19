import { FinalAward } from "./FinalAward";
import { Item } from "./Item";
import { Obstacle } from "./Obstacle";

/**
 * author: cxq
 * time: 2023/12/12 21:32:32
 * desc: 
 */
const { regClass, property } = Laya;

@regClass()
export class ItemRoot extends Laya.Script {
    declare owner: Laya.Sprite;

    @property({ type: [Item], tips: "奖励和金币等物品" })
    items: Item[];

    move(distance: number): void {
        this.owner.x += distance;
    }
}