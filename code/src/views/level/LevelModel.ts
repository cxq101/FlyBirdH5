/**
 * author: cxq
 * time: 2023/12/19 15:28:18
 * desc: 
 */

import { Model } from "../../core/mvc/Model";
import { LevelEvent } from "./LevelConst";
import { LevelLocalData } from "./LevelLocalData";

export class LevelModel extends Model {
    private static _ins: LevelModel;
    static get ins(): LevelModel {
        if (!this._ins) {
            this._ins = new LevelModel();
        }
        return this._ins;
    }

    private _distanceRatio = 0.01;
    private _currLevelId: number;

    private _localData: LevelLocalData;
    /** 当前关卡当前距离 */
    private _currLevelDistance: number = 0;
    /** 当前关卡最高距离 */
    private _currLevelTopDistance: number = 0;

    private constructor() {
        super();
        this._localData = new LevelLocalData();
    }

    get currLevelId() : number {
        return this._currLevelId;
    }

    set currLevelId(v : number) {
        this._currLevelId = v;
    }
    
    set currLevelDistance(v: number) {
        this._currLevelDistance = v;
        this.event(LevelEvent.DistanceChanged, v);
        if (this._currLevelDistance > this.currLevelTopDistance) {
            this.currLevelTopDistance = v;
            this.event(LevelEvent.TopDistanceChanged, v);
        }
    }

    get currLevelDistance(): number {
        return this._currLevelDistance;
    }

    set currLevelTopDistance(v: number) {
        this._currLevelTopDistance = v;
    }

    get currLevelTopDistance(): number {
        return this._currLevelTopDistance;
    }

    get currLevelHistoryTopDistance(): number {
        return this._localData.getHistoryRecord(this._currLevelId);
    }

    get currLevelDistanceFormat(): number {
        return this.formatDistance(this.currLevelDistance);
    }

    get currLevelTopDistanceFormat(): number {
        return this.formatDistance(this.currLevelTopDistance);
    }
    
    get currLevelHistoryTopDistanceFormat(): number {
        return this.formatDistance(this.currLevelHistoryTopDistance);
    }

    private formatDistance(distance: number): number {
        const real = Math.floor(distance * this._distanceRatio);
        return Math.max(real, 0);
    }

    recordPlayerPos(distance: number): void {
        this.currLevelDistance = distance;
    }

    moveBy(distance: number): void {
        this.currLevelDistance += distance;
    }

    resetDistance(): void {
        this.currLevelDistance = this.currLevelTopDistance = 0;
    }

    newRecord(): void {
        this._localData.newHistoryRecord(this._currLevelId, this.currLevelTopDistance);        
    }
}