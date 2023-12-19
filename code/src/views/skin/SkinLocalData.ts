/**
 * author: cxq
 * time: 2023/12/12 10:16:01
 * desc: 
 */

import { LocalData } from "../../utils/LocalData";

export interface ISkinLocalData {
    skinId: string;
    idleSkinIds: string[];
}

export class SkinLocalData extends LocalData<ISkinLocalData> {
    static readonly Key = "SkinLocalData";
    static readonly Default: ISkinLocalData = {
        skinId: "100001",
        idleSkinIds: ["100001"],
    }

    constructor() {
        super(SkinLocalData.Key, SkinLocalData.Default);
    }
    
    unlock(id: string): void {
        this.data.idleSkinIds.push(id);
        this.save();
    }

    adventure(id: string): void {
        this.data.skinId = id;
        this.save();
    }
}