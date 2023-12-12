import { controller, register } from "../../core/mvc/MVCDecorator";
import { Model } from "../../core/mvc/Model";
import { ConfigUtils, ConfigUtilsMap, SkinConfigData } from "../../utils/ConfigUtils";
import { LocalStorageUtils } from "../../utils/LocalStorageUtils";
import { ESkinItemStatus, ISkinListData, SkinEvent } from "./SkinConst";
import { SkinLocalData } from "./SkinLocalData";

/**
 * author: cxq
 * time: 2023/12/09 19:31:50
 * desc: 
 */
export class SkinModel extends Model {
    private static _ins: SkinModel;
    public static get ins(): SkinModel {
        if (!this._ins) {
            this._ins = new SkinModel();
        }
        return this._ins;
    }

    private constructor() {
        super();
    }
    
    checkStatus(id: string): ESkinItemStatus {
        let localData = SkinLocalData.data;
        return localData.skinId === id ? ESkinItemStatus.Adventure : localData.idleSkinIds.some(idleId => idleId === id) ? ESkinItemStatus.Idle : ESkinItemStatus.Locked
    }

    getList(): ISkinListData[] {
        let arr: ISkinListData[] = [];
        const configs: SkinConfigData[] = ConfigUtils.get("skin");
        for (let i = 0; i < configs.length; i++) {
            const conf = configs[i];
            arr.push({
                id: conf.id,
                lblName: conf.name,
                imgAvatar: `resources/icon/avatar/${conf.icon}.png`,
                status: this.checkStatus(conf.id),
            });
        }
        return arr;
    }

    unlock(id: string): void {
        const configs: SkinConfigData[] = ConfigUtils.get("skin");
        if (!configs.some(conf => conf.id === id)) {
            console.warn("unlock fail!!!, this skin is not exist!", id);
            return;
        }
        SkinLocalData.data.idleSkinIds.push(id);
        SkinLocalData.save();
        this.event(SkinEvent.Unlcok, id);
    }

    adventure(id: string): void {
        const configs: SkinConfigData[] = ConfigUtils.get("skin");
        if (!configs.some(conf => conf.id === id)) {
            console.warn("unlock fail!!!, this skin is not exist!", id);
            return;
        }
        SkinLocalData.data.skinId = id;
        SkinLocalData.save();
        this.event(SkinEvent.Adventure, id);
    }
}