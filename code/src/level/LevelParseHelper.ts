import { ELevelConst, ILevelPrefabData, LevelConfig } from "../views/level/LevelConst";

type ILevelParseProp<T extends Laya.Component> = {
    name: string;
    root: Laya.Sprite;
    components: T[], 
    component: new () => T;
}
/**
 * author: cxq
 * time: 2023/12/22 17:32:45
 * desc: 
 */
export class LevelParseHelper {
    private static parsePrefabRoot<T extends Laya.Component>(roots: { name: string, _$child?: ILevelPrefabData[] }[], name: string, parent: Laya.Sprite, components: T[], component: new () => T ): void {
        let root = roots.find(r => r.name === name);
        root && root._$child && root._$child.forEach(child => {
            // if child in rule 
            let node = this.createPrefabData(child, parent);
            components.push(node.getComponent(component));
        });
    }

    private static createPrefabData(data: ILevelPrefabData, root: Laya.Sprite): Laya.Sprite {
        let prefab = Laya.loader.getRes(data._$prefab) as Laya.Prefab;
        let node = prefab.create() as Laya.Sprite;
        node.x = data.x;
        node.y = data.y;
        data.width != null && (node.width = data.width);
        data.height != null && (node.height = data.height);
        data.anchorX != null && (node.anchorX = data.anchorX);
        data.anchorY != null && (node.anchorY = data.anchorY);
        root.addChild(node);
        return node;
    }

    static parse<T extends Laya.Component>(levelId: ELevelConst, props: ILevelParseProp<T>[]): void {
        const config = LevelConfig[levelId];
        let p: Laya.PrefabImpl = Laya.loader.getRes(config.path);
        let roots = p.data._$child as { name: string, _$child?: ILevelPrefabData[] }[];
        
        props.forEach(prop => this.parsePrefabRoot(roots, prop.name, prop.root, prop.components, prop.component));
    }

    static parse1(levelId: ELevelConst, nameList: string[]): LevelPrefabData[] {
        let prefabDatas: ILevelPrefabData[] = [];
        const config = LevelConfig[levelId];
        let p: Laya.PrefabImpl = Laya.loader.getRes(config.path);
        let roots = p.data._$child as { name: string, _$child?: ILevelPrefabData[] }[];
        roots.forEach(r => {
            if (nameList.some(name => name === r.name)) {
                prefabDatas = prefabDatas.concat(r._$child);
            }
        })
        return prefabDatas.map(p => new LevelPrefabData(p));
    }
}

export class LevelPrefabData {
    private static RATIO: number = 0.01;
    private _data: ILevelPrefabData;
    private _min: number;
    private _max: number;

    get min(): number {
        return this._min;
    }

    get max(): number {
        return this._max;
    }
    
    get data(): ILevelPrefabData {
        return this._data;
    }

    constructor(data: ILevelPrefabData) {
        this._data = data;
        const { x, width, anchorX } = data;
        [this._min, this._max] = LevelPrefabData.translate(x, width, anchorX);
    }

    static translate(x: number, width: number, anchorX: number): [number, number] {
        const r = LevelPrefabData.RATIO;
        const offsetX = width * anchorX;
        const min = x - offsetX;
        const max = min + width;
        return [Math.ceil(min * r), Math.floor(max * r)];
    }
}