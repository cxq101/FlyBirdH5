import { ArrayUtils } from "../utils/ArrayUtils";
import { SegmentTree } from "../utils/DataStructures/SegmentTree";
import { MathUtil } from "../utils/MathUtils";
import { ELevelConst, ELevelNodeSign, ILevelParseProp, ILevelPrefabData, LevelConfig } from "../views/level/LevelConst";
import { Ground } from "./Item/Ground";
import { Item } from "./Item/Item";
import { Obstacle } from "./Item/Obstacle";
import { LevelParseHelper, LevelPrefabData } from "./LevelParseHelper";


/**
 * author: cxq
 * time: 2023/12/29 09:19:22
 * desc: 
 */
const { regClass, property } = Laya;

@regClass()
export class LevelNodeManager extends Laya.Script {
    @property({ type: Laya.Sprite, tips: "地面根节点" })
    private groundRoot: Laya.Sprite;

    @property({ type: Laya.Sprite, tips: "障碍物根节点" })
    private obstacleRoot: Laya.Sprite;

    @property({ type: Laya.Sprite, tips: "物品根节点" })
    private itemRoot: Laya.Sprite;

    @property({ type: Laya.Sprite, tips: "player" })
    private player: Laya.Sprite;

    @property({ type: Number, tips: "player distance" })
    private playerDistance: number;

    private _items: Item[] = [];
    private _grounds: Ground[] = [];
    private _obstacles: Obstacle[] = [];

    get items(): Item[] {
        return this._items;
    }

    get grounds(): Item[] {
        return this._grounds;
    }

    get obstacles(): Item[] {
        return this._obstacles;
    }

    createNode(sign: ELevelNodeSign, data: ILevelPrefabData): Laya.Sprite {
        let node = Laya.Pool.getItem(sign);
        if (!node) {
            let prefab = Laya.loader.getRes(data._$prefab) as Laya.Prefab;
            node = prefab.create() as Laya.Sprite;
        }
        node.x = data.x;
        node.y = data.y;
        data.width != null && (node.width = data.width);
        data.height != null && (node.height = data.height);
        data.anchorX != null && (node.anchorX = data.anchorX);
        data.anchorY != null && (node.anchorY = data.anchorY);
        return node;
    }

    recoverNode(sign: ELevelNodeSign, node: Laya.Sprite): void {
        Laya.Pool.recover(sign, node);
    }

    recoverNodes(sign: ELevelNodeSign, nodes: any[]): void {
        nodes.forEach(n => {
            n.owner.removeSelf();
            this.recoverNode(sign, n.owner);
        })
        ArrayUtils.clear(nodes);
    }

    clear(): void {
        this.recoverNodes(ELevelNodeSign.Item, this._items);
        this.recoverNodes(ELevelNodeSign.Ground, this._grounds);
        this.recoverNodes(ELevelNodeSign.Obstacle, this._obstacles);
    }

    private parse(levelId: ELevelConst, nameList: string[]): LevelPrefabData[] {
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

    private parseLevel(levelId: ELevelConst): void {
        let dataList = this.parse(levelId, ["itemRoot", "groundRoot", "obstacleRoot"]);
        let tree = new SegmentTree();
        tree.buildTree(dataList);
        let target = { min: 1, max: 2 };
        tree.query(tree.root, target.min, target.max);
    }

    private parsePrefabRoot<T extends Laya.Component>(roots: { name: string, _$child?: ILevelPrefabData[] }[], name: string, parent: Laya.Sprite, components: T[], component: new () => T ): void {
        let root = roots.find(r => r.name === name);
        root && root._$child && root._$child.forEach(child => {
            // if child in rule 
            // if (this.checkInScreen()) {

            // }
            // let node = this.createPrefabData(child, parent);
            // components.push(node.getComponent(component));
        });
    }

    onUpdate(): void {
        // let datas = tree.query(tree.root, target.min, target.max);
        
        // datas.
    }

    private checkInScreen(childData: ILevelPrefabData): boolean {
        return Math.abs(childData.x - this.player.x) <= this.playerDistance;
    }

    private createPrefabData(data: ILevelPrefabData, root: Laya.Sprite): Laya.Sprite {
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

}