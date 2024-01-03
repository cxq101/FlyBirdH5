import { ILevelPrefabData } from "../../views/level/LevelConst";

export class LevelPrefabData {
    private static RATIO: number = 0.01;
    private _data: ILevelPrefabData;
    private _min: number;
    private _max: number;
    private _rootName: string;

    get min(): number {
        return this._min;
    }

    get max(): number {
        return this._max;
    }
    
    get data(): ILevelPrefabData {
        return this._data;
    }
    
    get sign(): string {
        return this._data._$prefab;
    }

    get rootName(): string {
        return this._rootName;
    }

    constructor(data: ILevelPrefabData, rootName: string) {
        this._data = data;
        this._rootName = rootName;
        const { x, width, anchorX } = data;
        [this._min, this._max] = LevelPrefabData.translate(x, width, anchorX);
    }

    static translate(x: number, width: number, anchorX: number): [number, number] {
        x = x == null ? 0 : x;
        width = width == null ? 0 : width;
        anchorX = anchorX == null ? 0 : anchorX;
        const r = LevelPrefabData.RATIO;
        const offsetX = width * anchorX;
        const min = x - offsetX;
        const max = min + width;
        return [Math.floor(min * r), Math.ceil(max * r)];
    }
}