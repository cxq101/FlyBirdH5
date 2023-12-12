import { controller, register } from "../../core/mvc/MVCDecorator";
import { Model } from "../../core/mvc/Model";
import { ConfigUtils, ConfigUtilsMap, SkinConfigData } from "../../utils/ConfigUtils";
import { LocalStorageUtils } from "../../utils/LocalStorageUtils";
import { ESkinItemStatus } from "./SkinConst";

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
    
    private checkStatus(id: string): ESkinItemStatus {
        let gameData = LocalStorageUtils.gameData;
        return gameData.skinId === id ? ESkinItemStatus.Working : gameData.idleSkinIds.some(idleId => idleId === id) ? ESkinItemStatus.Idle : ESkinItemStatus.Locked
    }

    getList(): any[] {
        let arr = [];
        const configs: SkinConfigData[] = ConfigUtils.get("skin");
        for (let i = 0; i < configs.length; i++) {
            const conf = configs[i];
            arr.push({
                lblName: conf.name,
                imgAvatar: `resources/icon/avatar/${conf.icon}.png`,
                status: this.checkStatus(conf.id),
            });
        }
        return arr;
    }
}