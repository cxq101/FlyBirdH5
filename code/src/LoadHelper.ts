import { BackgroundRoot } from "./level/BackgroundRoot";
import { Level } from "./level/Level";
import { Player } from "./level/Player";

/**
 * author: cxq
 * time: 2023/12/13 16:11:00
 * desc: 
 */
const { regClass, property } = Laya;

@regClass()
export class LoadHelper extends Laya.Script {
    @property({ type: Laya.Prefab })
    backgroundRootPrefab: Laya.Prefab;
 
    @property({ type: Laya.Prefab })
    testLevelPrefab: Laya.Prefab;
 
    @property({ type: Laya.Prefab })
    playerPrefab: Laya.Prefab;

    // @property({ type: Laya.Prefab })
    // level: Laya.Prefab;
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

    createTestLevel(): void {
        let levelNode = this.testLevelPrefab.create();
        this.root.addChild(levelNode);

        let playerNode = this.playerPrefab.create() as Laya.Sprite;
        
        let level = levelNode.getComponent(Level);
        level.init(playerNode, this._backgroundRoot);
    }
}