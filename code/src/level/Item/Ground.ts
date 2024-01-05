import { Item } from "./Item";

/**
 * author: cxq
 * time: 2023/12/22 17:06:39
 * desc: 
 */
const { regClass, classInfo, property } = Laya;

@regClass()
@classInfo({ menu: "Level_Item", caption: "Ground" })
export class Ground extends Item {
    @property({ type: Boolean, tips: "是否向后移动" })
    isScrollBack: boolean = false;
    @property({ type: Number, tips: "移动速度" })
    moveSpeed: number = 100;
}