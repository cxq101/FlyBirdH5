/**
 * author: cxq
 * time: 2023/12/19 15:31:20
 * desc: 
 */

import { LocalData } from "../../utils/LocalData";

export type ILevelLocalData = { [key: number]: { topScore: number }}

export class LevelLocalData extends LocalData<ILevelLocalData> {
    static readonly Key = "LevelLocalData";
    static readonly Default: ILevelLocalData = {};

    constructor() {
        super(LevelLocalData.Key, LevelLocalData.Default);
    }

    newHistoryRecord(levelId: number, score: number): void {
        if (!this.data[levelId]) {
            this.data[levelId] = { topScore: score };
        } else {
            this.data[levelId].topScore = score;
        }
        this.save();
    }

    getHistoryRecord(levelId: number): number {
        return this.data[levelId] ? this.data[levelId].topScore : 0;
    }
}