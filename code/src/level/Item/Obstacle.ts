import { Item } from "./Item";

/**
 * author: cxq
 * time: 2023/12/12 21:32:32
 * desc: 
 */
const { regClass, classInfo, property } = Laya;

@regClass()
@classInfo({ menu: "Level_Item", caption: "Obstacle" })
export class Obstacle extends Item {
    declare owner: Laya.Sprite;
    @property({ type: Number, tips: "默认的弹跳角度" })
    degrees: number;

    @property({ type: Number, tips: "弹力" })
    force: number;

    onStart(): void {
    }

    checkCollision(): void {
        
    }

    onUpdate(): void {
    }
}
