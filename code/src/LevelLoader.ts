import { BackgroundRoot } from "./level/BackgroundRoot";
import { Level } from "./level/Level";
import { LevelModel } from "./views/level/LevelModel";

/**
 * author: cxq
 * time: 2023/12/13 16:11:00
 * desc: 
 */
const { regClass, property } = Laya;

@regClass()
export class LevelLoader extends Laya.Script {
    @property({ type: Laya.Prefab, tips: "关卡基础控件" })
    levelBasePrefab: Laya.Prefab;

    @property({ type: Laya.Prefab, tips: "视差滚动背景" })
    backgroundRootPrefab: Laya.Prefab;
    

    get root(): Laya.Sprite {
        return this.owner.parent as Laya.Sprite; 
    }
    
    createBackgroundRoot(): BackgroundRoot {
        let node = this.backgroundRootPrefab.create();
        this.root.addChild(node);
        return node.getComponent(BackgroundRoot);   
    }

    loadLevel(levelId: number, backgroundRoot: BackgroundRoot): Level {
        let levelNode = this.levelBasePrefab.create();
        this.root.addChild(levelNode);
        let level = levelNode.getComponent(Level);
        level.init(levelId, backgroundRoot);
        return level;
    }

    unloadLevel(level: Level): void {
        LevelModel.ins.currId = null;
        level.owner.destroy();
    }
}