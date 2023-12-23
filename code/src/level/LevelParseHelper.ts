import { ELevelConst, ILevelPrefabData, LevelConfig } from "../views/level/LevelConst";
import { FinalAward } from "./Item/FinalAward";
import { FoCat } from "./Item/FoCat";

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
}