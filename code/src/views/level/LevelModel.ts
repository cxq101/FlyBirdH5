/**
 * author: cxq
 * time: 2023/12/19 15:28:18
 * desc: 
 */
import { Model } from "../../core/mvc/Model";
import { ConfigUtils, DialogConfigData } from "../../utils/ConfigUtils";
import { ELevelConst, LevelEvent } from "./LevelConst";
import { LevelLocalData } from "./LevelLocalData";

export class LevelModel extends Model {
    private static _ins: LevelModel;
    static get ins(): LevelModel {
        if (!this._ins) {
            this._ins = new LevelModel();
        }
        return this._ins;
    }

    private _distanceRatio = 100 / 8000;
    private _startSpace = 0;
    private _currId: number;
    private _freeJumpTimes: number;

    private _isScrollClose: boolean;

    private _localData: LevelLocalData;
    /** 当前关卡当前距离 */
    private _currDistance: number = 0;
    /** 当前关卡最高距离 */
    private _currTopDistance: number = 0;

    private _dialogIndex = 0;

    private constructor() {
        super();
        this._localData = new LevelLocalData();
    }

    get currId() : number {
        return this._currId;
    }

    set currId(v : number) {
        this._currId = v;
        this._dialogIndex = 0;
        this._freeJumpTimes = 1;
    }

    get isScrollClose() : boolean {
        return this._isScrollClose;
    }

    set isScrollClose(v : boolean) {
        this._isScrollClose = v;
    }
    
    set currDistance(v: number) {
        this._currDistance = v;
        this.event(LevelEvent.DistanceChanged, v);
        if (this._currDistance > this.currTopDistance) {
            this.currTopDistance = v;
            this.event(LevelEvent.TopDistanceChanged, v);
        }
    }

    get currDistance(): number {
        return this._currDistance;
    }

    set currTopDistance(v: number) {
        this._currTopDistance = v;
    }

    get currTopDistance(): number {
        return this._currTopDistance;
    }

    get currHistoryTopDistance(): number {
        return this._localData.getHistoryRecord(this._currId);
    }

    get currDistanceFormat(): number {
        return this.formatDistance(this.currDistance);
    }

    get currTopDistanceFormat(): number {
        return this.formatDistance(this.currTopDistance);
    }
    
    get currHistoryTopDistanceFormat(): number {
        return this.formatDistance(this.currHistoryTopDistance);
    }

    private formatDistance(distance: number): number {
        const real = Math.floor(distance * this._distanceRatio);
        return Math.max(real, 0);
    }

    setStartSpace(v: number): void {
        this._startSpace = v;
    }

    isPracticeMode(): boolean {
        return this.currId == ELevelConst.LevelPracticeId;
    }

    isSecondLevel(): boolean {
        return this.currId == ELevelConst.Level_10002;
    }

    isShowProgress(): boolean {
        return this.isSecondLevel() && this.currDistance > this._startSpace;
    }

    isExistTop(): boolean {
        return this.isSecondLevel() && this.currTopDistance > this.currDistance;
    }

    isExistScrollButton(): boolean {
        return (this.isPracticeMode() || this.isSecondLevel()) && this.currTopDistance > this.currDistance;
    }

    isExistFree(): boolean {
        return this._freeJumpTimes > 0;
    }

    scrollEnd(): void {
        this.recordPlayerPos(this.currTopDistance);
    }

    recordPlayerPos(distance: number): void {
        this.currDistance = distance;
    }

    resetDistance(): void {
        this.currDistance = this.currTopDistance = 0;
    }

    checkExistNewRecord(): boolean {
        return this.currTopDistanceFormat > this.currHistoryTopDistanceFormat;
    }

    saveNewRecord(): void {
        this._localData.newHistoryRecord(this._currId, this.currTopDistance);        
    }

    setLableDialog(label: Laya.Label): void {
        const configs: DialogConfigData[] = ConfigUtils.get("dialog");
        const config = configs.find(c => c.id == this._currId);
        if (!config) return;
        let dialog = config.dialogs[this._dialogIndex];
        this._dialogIndex = (this._dialogIndex + 1) % config.dialogs.length;
        label.text = dialog.desc;
        switch (dialog.type) {
            case 1:
                label.setVar("n", this.currHistoryTopDistanceFormat);
                break;
            case 2:
                label.setVar("n", this.currHistoryTopDistanceFormat - this.currDistanceFormat);
                break;
            default:
                break;
        }
    }
}