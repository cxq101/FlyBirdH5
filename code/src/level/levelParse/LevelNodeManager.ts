import { ArrayUtils } from "../../utils/ArrayUtils";
import { SegmentTree } from "../../utils/DataStructures/SegmentTree";
import { ELevelNodeSign, ILevelPrefabData, ELevelConst, LevelConfig } from "../../views/level/LevelConst";
import { EItemType } from "../Item/EItemType";
import { Ground } from "../Item/Ground";
import { Item } from "../Item/Item";
import { Obstacle } from "../Item/Obstacle";
import { LevelCamera } from "../LevelCamera";
import { LevelPrefabData } from "./LevelPrefabData";

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

    @property({ type: LevelCamera, tips: "LevelCamera" })
    private camera: LevelCamera;

    @property({ type: Number, tips: "extent distance" })
    private cameraDistance: number;

    private _tree: SegmentTree; 
    private _prefabMap: Map<LevelPrefabData, Item> = new Map();

    private _screenRange: [number, number];
    private _screenOffset: number = 0;

    get items(): Item[] {
        let list = this.getItemsByType(EItemType.Item);
        list = list.concat(this.getItemsByType(EItemType.FoCat));
        list = list.concat(this.getItemsByType(EItemType.FinalAward));
        return list;
    }

    get grounds(): Ground[] {
        return this.getItemsByType(EItemType.Ground);
    }

    get obstacles(): Obstacle[] {
        return this.getItemsByType(EItemType.Obstacle) as Obstacle[];
    }

    private getItemsByType(type: EItemType): Item[] {
        let items: Item[] = [];
        this._prefabMap.forEach(item => {
            item.type === type && items.push(item);
        })
        return items;
    }

    private createNode(sign: string, data: ILevelPrefabData): Laya.Sprite {
        let node = Laya.Pool.getItem(sign) as Laya.Sprite;
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

    private removeAndRecoverNode(sign: string, node: Laya.Sprite): void {
        node.removeSelf();
        Laya.Pool.recover(sign, node);
    }

    private parse(levelId: ELevelConst, signList: ELevelNodeSign[]): LevelPrefabData[] {
        let prefabDatas: LevelPrefabData[] = [];
        const config = LevelConfig[levelId];
        let p: Laya.PrefabImpl = Laya.loader.getRes(config.path);
        let roots = p.data._$child as { name: string, _$child?: ILevelPrefabData[] }[];
        roots.forEach(r => {
            if (signList.some(name => name === r.name) && r._$child && r._$child.length > 0) {
                let list: LevelPrefabData[] = r._$child.map(child => new LevelPrefabData(child, r.name));
                prefabDatas = prefabDatas.concat(list);
            }
        })
        return prefabDatas;
    }

    private refreshNodes(): void {
        let tree = this._tree;
        if (tree == null) return;
        const [ min, max ]  = this.getCameraRange();
        if (this._screenRange != null && (this._screenRange[0] == min && this._screenRange[1] == max)) {
            // console.log("level node mgr:   screen 位置无变化 ");
            return;
        }
        this._screenRange = [min, max];

        const list = tree.query(tree.root, min, max) as LevelPrefabData[];

        let prefabDataList = Array.from(this._prefabMap.keys());
        let needRemoveList = ArrayUtils.difference(prefabDataList, list);
        needRemoveList.forEach(data => {
            let item = this._prefabMap.get(data);
            if (item) {
                this.removeAndRecoverNode(data.sign, item.owner);
                this._prefabMap.delete(data);
            } else {
                console.log("remove item but item not in map ", data);
            }
        })

        let needCreateList = ArrayUtils.difference(list, prefabDataList);

        needCreateList.forEach(i => {
            let node = this.createNode(i.sign, i.data);
            // 后期修改为按zOrder排列更好
            (this as any)[i.rootName].addChild(node);
            this._prefabMap.set(i, node.getComponent(Item));
        });
        // console.log("level node mgr: 删除 ", needRemoveList, "  新增 ", needCreateList, this._screenRange, this._prefabMap, this.items, this.grounds, this.obstacles);
    }

    private getCameraRange(): [number, number] {
        let playerDistance = this.cameraDistance;
        let x = this.camera.distance - playerDistance - this._screenOffset;
        let width = Laya.stage.width + 2 * playerDistance;
        return LevelPrefabData.translate(x, width, 0);
    }

    init(levelId: ELevelConst, offset: number): void {
        let dataList = this.parse(levelId, [ELevelNodeSign.Item, ELevelNodeSign.Ground, ELevelNodeSign.Obstacle]);
        let tree = new SegmentTree();
        tree.buildTree(dataList);
        this._tree = tree;
        this._screenOffset = offset;
    }

    clear(): void {
        this._prefabMap.forEach((item, data) => this.removeAndRecoverNode(data.sign, item.owner));
        this._prefabMap.clear();
        this._tree.clear();
    }

    onUpdate(): void {
        this.refreshNodes();
    }
}
