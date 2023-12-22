import { ConfigPath } from "../../const/ConfigPath";

export interface ILevelPrefabData {
    name: string, 
    visible: boolean, 
    x: number, 
    y: number, 
    width: number, 
    height: number, 
    anchorX: number, 
    anchorY: number, 
    _$prefab: string 
}

export class LevelEvent {
    static readonly DistanceChanged = "DistanceChanged";
    static readonly TopDistanceChanged = "TopDistanceChanged";
}

export enum ELevelMode {
    Practice,
    Normal,
}

export enum ELevelConst {
    LevelPracticeId = 10000,

    Level_10001 = 10001,
    Level_10002 = 10002,
}

export const LevelConfig = {
    [ELevelConst.LevelPracticeId]: { path: ConfigPath.LH_Level_10000 },
    [ELevelConst.Level_10001]: { path: ConfigPath.LH_Level_10001 },
    [ELevelConst.Level_10002]: { path: ConfigPath.LH_Level_10002 },
}
