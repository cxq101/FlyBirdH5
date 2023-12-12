const { regClass } = Laya;
import { ViewMgr } from "../../core/UI/ViewMgr";
import { model } from "../../core/mvc/MVCDecorator";
import { EViewKey } from "../ViewConst";
import { ESkinItemStatus } from "./SkinConst";
import { SkinModel } from "./SkinModel";
import { SkinViewRTBase } from "./SkinViewRT.generated";

@regClass()
export class SkinViewRT extends SkinViewRTBase {
    private onClickClose(): void {
        ViewMgr.ins.close(EViewKey.SkinView);
    }

    private onItemMouse(e: Laya.Event, index: number): void {
        //鼠标单击事件触发
        // if (e.type == Laya.Event.MOUSE_DOWN) {
        //     // console.log("事件目标", e.target);
        //     (e.target as Laya.Image).skin = "bg/bg100-1.png"; 

        // }

        if (e.type == Laya.Event.CLICK) {
            if (e.target.name == "btnUnlockOrUse") {
                let listArray = this.list.array;
                let itemData = listArray[index];
                if (itemData.status === ESkinItemStatus.Idle) {
                    // ctrl 选择皮肤                    
                } else if (itemData.status === ESkinItemStatus.Locked) {
                    // ctrl 播放广告解锁皮肤                    
                }
            }
        }
    }

    onAwake(): void {
        this.btnClose.on(Laya.Event.CLICK, this.onClickClose);
        this.list.mouseHandler = new Laya.Handler(this, this.onItemMouse, null, false);
        this.list.array = SkinModel.ins.getList();
    }
}