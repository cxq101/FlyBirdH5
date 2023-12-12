/**
 * author: cxq
 * time: 2023/12/11 08:57:49
 * desc: 
 * TODO:
 * 1.参数key没有被约束；
 * 2.目前是通过json进行加载，需要支持压缩包以及二进制；
 * 3.解析出来目前是any类型的数据；
 */

import { ConfigPath } from "../const/ConfigPath";
import { TConstructor } from "../core/base/CoreConst";

export class SkinConfigData {
    id: string;
    name: string;
    icon: string;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.icon = data.icon;
    }
}

export interface IConfigData {
    path: string,
    cls: TConstructor
}

export const ConfigUtilsMap: { [key: string]: IConfigData } = {
    skin: {
        path: ConfigPath.JSON_Skin,
        cls: SkinConfigData
    },
}

export class ConfigUtils {
    private static jsonMap: {[key: string]: any} = {};

    static get(key: keyof typeof ConfigUtilsMap) {
        if (this.jsonMap[key] == null) {
            const { cls, path } = ConfigUtilsMap[key];
            let res = Laya.loader.getRes(path);
            if (res) {
                let arr = [];
                for (let key in res.data) {
                    let data =  new cls(res.data[key]);
                    arr.push(data);
                }
                this.jsonMap[key] = arr;
            }
        }
        return this.jsonMap[key];    
    }
}

  
  