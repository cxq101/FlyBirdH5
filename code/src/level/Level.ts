import { ViewMgr } from "../core/UI/ViewMgr";
import { MathUtil } from "../utils/MathUtils";
import { Game } from "../views/Game";
import { EViewKey } from "../views/ViewConst";
import { LevelModel } from "../views/level/LevelModel";
import { BackgroundRoot } from "./BackgroundRoot";
import { InputManager } from "./InputManager";
import { ItemRoot } from "./ItemRoot";
import { LevelCamera } from "./LevelCamera";
import { ObstacleRoot } from "./ObstacleRoot";
import { Player } from "./Player";

/**
 * author: cxq
 * time: 2023/12/14 11:05:26
 * desc: 
 */
const { regClass, property } = Laya;

@regClass()
export class Level extends Laya.Script {
    declare owner: Laya.Sprite;

    @property({ type: Laya.Sprite, tips: "玩家出生坐标对象" })
    private spawnPointNode: Laya.Sprite;

    @property({ type: Laya.Sprite, tips: "地面高度对象" })
    private groundNode: Laya.Sprite;

    @property({ type: ObstacleRoot, tips: "障碍物根节点" })
    private obstacleRoot: ObstacleRoot;

    @property({ type: ItemRoot, tips: "物品根节点" })
    private itemRoot: ItemRoot;
    
    @property({ type: InputManager, tips: "关卡输入控制" })
    private inputManager: InputManager;

    private _isInit: boolean = false;

    @property({ type: Player, tips: "关卡输入控制" })
    private player: Player; 

    @property({ type: LevelCamera, tips: "关卡输入控制" })
    public levelCamera: LevelCamera;

    public backgroundRoot: BackgroundRoot;

    get spawnPoint(): [number, number] {
        const {x, y} = this.spawnPointNode;
        return [x, y];
    }

    get groundY(): number {
        return this.groundNode.y;
    }

    private checkPlayerGround(): boolean {
        const lastState = this.player.isGround;
        const newState = this.player.isBelowHeight(this.groundY);
        if (lastState != newState) {
            this.player.isGround = newState;
            // 落地
            if (!lastState && newState) {
                this.player.stop();
                this.player.owner.y = this.groundY;
                return true;
            }
        }
        return false;
    }

    private checkItemCollision(): void {
        if (Game.ins.isWin()) return;
        const [playerX, playerW] = this.player.getGlobalCollisionRange();
        this.itemRoot.items.forEach(item => {
            let [obstacleX, obstacleW] = item.getGlobalCollisionRange();
            if (MathUtil.isRangesPartiallyOverlap(playerX, playerW, obstacleX, obstacleW)) {
                Game.ins.win();
            }
        });
    }

    private checkObstacleCollision(): boolean {
        const [playerX, playerW] = this.player.getGlobalCollisionRange();
        let collisionObstacle = this.obstacleRoot.obstacles.find(o => {
            let [obstacleX, obstacleW] = o.getGlobalCollisionRange();
            return MathUtil.isRangesPartiallyOverlap(playerX, playerW, obstacleX, obstacleW);
        });
        if (collisionObstacle) {
            this.player.addForce(collisionObstacle.force, collisionObstacle.degrees);
            return true;
        }
        return false;
    }

    onUpdate(): void {
        if (!this._isInit) return;
        if (this.checkPlayerGround()) {
            if (!this.checkObstacleCollision()) {
                this.recordPlayerPos();            
            }
        }
        this.checkItemCollision();
    }

    onDestroy(): void {
        LevelModel.ins.resetDistance();
    }

    private parsePrefabData(levelId: number): void {
        let p: Laya.PrefabImpl =Laya.loader.getRes(`resources/prefabs/level/chapter/Level_${levelId}.lh`);
        let roots = p.data._$child as { name: string, _$child?: { name: string, visible: boolean, x: number, y: number, width: number, _$prefab: string }[] }[];
        let itemRoot = roots.find(r => r.name === "itemRoot");
        let obstacleRoot = roots.find(r => r.name === "obstacleRoot");
        
        obstacleRoot._$child.forEach((child) => {
            let prefab = Laya.loader.getRes(child._$prefab) as Laya.Prefab;
            let node = prefab.create() as Laya.Sprite;
            node.x = child.x;
            child.width != null && (node.width = child.width);
            this.obstacleRoot.owner.addChild(node);
            this.obstacleRoot.addItemNode(node);
        });
        this.obstacleRoot.alignToHeight(this.groundY);

        itemRoot._$child && itemRoot._$child.forEach((child) => {
            let prefab = Laya.loader.getRes(child._$prefab) as Laya.Prefab;
            let node = prefab.create() as Laya.Sprite;
            node.x = child.x;
            node.y = child.y;
            child.width != null && (node.width = child.width);
            this.itemRoot.owner.addChild(node);
            this.itemRoot.addItemNode(node);
        });
    }

    init(levelId: number, backgroundRoot: BackgroundRoot): void {
        if (this._isInit) return;
        this._isInit = true;
        LevelModel.ins.currId = levelId;

        let realStartPos = this.obstacleRoot.owner.x - this.spawnPoint[0];
        LevelModel.ins.setStartSpace(realStartPos);

        this.parsePrefabData(levelId);

        this.player.spawn(...this.spawnPoint);

        this.inputManager.init(this.player);

        this.levelCamera.init(this.player);
        this.levelCamera.addFollower(backgroundRoot);
        this.levelCamera.addFollower(this.itemRoot);
        this.levelCamera.addFollower(this.obstacleRoot);

        this.backgroundRoot = backgroundRoot;
    }

    recordPlayerPos(): void {
        LevelModel.ins.recordPlayerPos(this.levelCamera.distance);
    }

    reEnterLevel(levelId: number): void {
        LevelModel.ins.currId = levelId;
        this.levelCamera.backToStart();
        LevelModel.ins.resetDistance();
        this.itemRoot.removeAllObstacles();
        this.obstacleRoot.removeAllObstacles();
        this.parsePrefabData(levelId);
    }

    restart(): void {
        this.levelCamera.backToStart();
        LevelModel.ins.resetDistance();
    }

    scrollTo(pos: number): void {
        this.player.hide();
        this.inputManager.enabled = false;
        LevelModel.ins.isScrollClose = true;
        ViewMgr.ins.close(EViewKey.HudView);
        this.levelCamera.scrollTo(pos, Laya.Handler.create(this, () => {
            this.player.show();
            this.inputManager.enabled = true;
            LevelModel.ins.scrollEnd();
            ViewMgr.ins.open(EViewKey.HudView);
            LevelModel.ins.isScrollClose = false;
        }, null, true));
    }
    
}