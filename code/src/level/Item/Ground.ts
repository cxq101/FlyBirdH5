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
    
}