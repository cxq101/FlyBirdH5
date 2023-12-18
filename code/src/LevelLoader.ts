import { BackgroundRoot } from "./level/BackgroundRoot";
import { Level } from "./level/Level";

/**
 * author: cxq
 * time: 2023/12/13 16:11:00
 * desc: 
 */
const { regClass, property } = Laya;

@regClass()
export class LevelLoader extends Laya.Script {
    @property({ type: Laya.Prefab, tips: "输入控制"})
    inputManagerPrefab: Laya.Prefab;
    
    @property({ type: Laya.Prefab, tips: "camera移动控制"})
    cameraPrefab: Laya.Prefab;
    
    @property({ type: Laya.Prefab })
    playerPrefab: Laya.Prefab;
    
    @property({ type: Laya.Prefab })
    testLevelPrefab: Laya.Prefab;

    @property({ type: Laya.Prefab })
    backgroundRootPrefab: Laya.Prefab;
    
    private _testLevel: Level;
    
    private _backgroundRoot: BackgroundRoot;

    get root(): Laya.Sprite {
        return this.owner.parent as Laya.Sprite; 
    }
    
    createBackgroundRoot(): void {
        let node = this.backgroundRootPrefab.create();
        this.root.addChild(node);
        this._backgroundRoot = node.getComponent(BackgroundRoot);
        this._backgroundRoot.enterAnim();
    }

    loadLevel(): Level {
        let levelNode = this.testLevelPrefab.create();
        this.root.addChild(levelNode);

        let inputManagerNode = this.inputManagerPrefab.create() as Laya.Sprite;
        let cameraNode = this.cameraPrefab.create() as Laya.Sprite;
        let playerNode = this.playerPrefab.create() as Laya.Sprite;
        
        let level = levelNode.getComponent(Level);
        level.init(inputManagerNode, playerNode, cameraNode, this._backgroundRoot);
        return level;
    }

    unloadLevel(level: Level): void {
        let levelOwner = level.owner;
        levelOwner.destroy();
    }
}