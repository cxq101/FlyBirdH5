import { controller, register } from "../../core/mvc/MVCDecorator";
import { Model } from "../../core/mvc/Model";
import { ConfigUtils, ConfigUtilsMap, SkinConfigData } from "../../utils/ConfigUtils";
import { ESkinItemStatus } from "./SkinConst";

/**
 * author: cxq
 * time: 2023/12/09 19:31:50
 * desc: 
 */
@register("SkinModel")
export class SkinModel extends Model {
    constructor() {
        super();
        console.log("skin model  init======");
    }

    getList(): any[] {
        let arr = [];
        const configs: SkinConfigData[] = ConfigUtils.get("dsda");
        for (let i = 0; i < configs.length; i++) {
            const conf = configs[i];
            arr.push({
                lblName: conf.name,
                imgAvatar: `resources/icon/avatar/${conf.icon}.png`,
                status: (i % 3 == 0) ? ESkinItemStatus.Idle : (i % 3 == 1) ? ESkinItemStatus.Locked : ESkinItemStatus.Working,
            });
        }
        return arr;
    }
}