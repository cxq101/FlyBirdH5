import { Model } from "../../core/mvc/Model";
import { ConfigUtils, SkinConfigData } from "../../utils/ConfigUtils";
import { PathUtils } from "../../utils/PathUtils";
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
    private _localData: SkinLocalData;

    private constructor() {
        super();
        this._localData = new SkinLocalData();
    }
    
    checkStatus(id: string): ESkinItemStatus {
        let localData = this._localData.data;
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
                status: this.checkStatus(conf.id),
                imgAvatar: PathUtils.getAvatar(conf.icon),
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
        this._localData.data.idleSkinIds.push(id);
        this._localData.unlock(id);
        this.event(SkinEvent.Unlcok, id);
    }

    adventure(id: string): void {
        const configs: SkinConfigData[] = ConfigUtils.get("skin");
        if (!configs.some(conf => conf.id === id)) {
            console.warn("unlock fail!!!, this skin is not exist!", id);
            return;
        }
        this._localData.adventure(id);
        this.event(SkinEvent.Adventure, id);
    }

    getCurrentSkin(): string {
        let id = this._localData.data.skinId;
        const configs: SkinConfigData[] = ConfigUtils.get("skin");
        let conf = configs.find(conf => conf.id === id);
        return PathUtils.getAvatar(conf.icon);
    }
}