import { Item } from "./Item";

/**
 * author: cxq
 * time: 2023/12/12 21:32:32
 * desc: 
 */
const { regClass, property } = Laya;

@regClass()
export class FinalAward extends Item {
    declare owner: Laya.Sprite;
}
