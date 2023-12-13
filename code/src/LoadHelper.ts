import { BackgroundRoot } from "./level/BackgroundRoot";

/**
 * author: cxq
 * time: 2023/12/13 16:11:00
 * desc: 
 */
const { regClass, property } = Laya;

@regClass()
export class LoadHelper extends Laya.Script {
    @property({ type: Laya.Prefab })
    playerPrefab: Laya.Prefab;

    @property({ type: Laya.Prefab })
    backgroundRoot: Laya.Prefab;
    
    @property({ type: Laya.Prefab })
    levelCamera: Laya.Prefab;
    
    private backgroundRoot2: BackgroundRoot;
    
    createBackgroundRoot(): void {
        let root = this.owner.parent;
        let node = this.backgroundRoot.create();
        root.addChild(node);
        this.backgroundRoot2 = node.getComponent(BackgroundRoot);
        this.backgroundRoot2.enterAnim();
    }
}