const { regClass } = Laya;
import { ViewMgr } from "../../core/UI/ViewMgr";
import { model } from "../../core/mvc/MVCDecorator";
import { EViewKey } from "../ViewConst";
import { ESkinItemStatus, ISkinListData, SkinEvent } from "./SkinConst";
import { SkinController } from "./SkinController";
import { SkinModel } from "./SkinModel";
import { SkinViewRTBase } from "./SkinViewRT.generated";

@regClass()
export class SkinViewRT extends SkinViewRTBase {
    private onClickClose(): void {
        ViewMgr.ins.close(EViewKey.SkinView);
    }

    private onItemMouse(e: Laya.Event, index: number): void {
        if (e.type == Laya.Event.CLICK) {
            if (e.target.name == "btnUnlockOrUse") {
                let listArray = this.list.array as ISkinListData[];
                let itemData = listArray[index];
                if (itemData.status === ESkinItemStatus.Idle) {
                    // ctrl 选择皮肤             
                    SkinController.ins.adventure(itemData.id);
                } else if (itemData.status === ESkinItemStatus.Locked) {
                    // ctrl 播放广告解锁皮肤      
                    SkinController.ins.unlcok(itemData.id);
                }
            }
        }
    }

    private refreshStatus(id: string): void {
        let listArray = this.list.array as ISkinListData[];
        let index = listArray.findIndex(data => data.id === id);
        let itemData = listArray[index];
        itemData.status = SkinModel.ins.checkStatus(id);
        this.list.changeItem(index, itemData);
    }

    private onSkinAdventure(id: string): void {
        let listArray = this.list.array as ISkinListData[];
        let currAdventure = listArray.find(data => data.status === ESkinItemStatus.Adventure);
        this.refreshStatus(currAdventure.id);
        this.refreshStatus(id);
    }

    private onSkinUnlock(id: string): void {
        this.refreshStatus(id);
    }

    onAwake(): void {
        this.btnClose.on(Laya.Event.CLICK, this.onClickClose);
        this.list.mouseHandler = new Laya.Handler(this, this.onItemMouse, null, false);

    }

    onEnable(): void {
        SkinModel.ins.on(SkinEvent.Unlcok, this, this.onSkinUnlock);
        SkinModel.ins.on(SkinEvent.Adventure, this, this.onSkinAdventure);

        this.list.array = SkinModel.ins.getList();
    }

    onDisable(): void {
        SkinModel.ins.off(SkinEvent.Unlcok, this, this.onSkinUnlock);
        SkinModel.ins.off(SkinEvent.Adventure, this, this.onSkinAdventure);
    }
}