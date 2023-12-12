/**
 * author: cxq
 * time: 2023/12/12 10:16:01
 * desc: 
 */

import { LocalStorageUtils } from "../../utils/LocalStorageUtils";

export interface ISkinLocalData {
    skinId: string;
    idleSkinIds: string[];
}

export class SkinLocalData {
    static readonly Key = "SkinLocalData";
    static readonly Default: ISkinLocalData = {
        skinId: "100001",
        idleSkinIds: ["100001"],
    }

    private static _data: ISkinLocalData;

    static get data(): ISkinLocalData {
        if (this._data == null) {
            this._data = LocalStorageUtils.load(SkinLocalData.Key);
            if (this._data == null) {
                this._data = SkinLocalData.Default;
            }
        }
        return this._data;
    }

    static save(): void {
        LocalStorageUtils.save(SkinLocalData.Key, this.data);
    }
}