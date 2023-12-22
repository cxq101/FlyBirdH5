import { ViewMgr } from "../core/UI/ViewMgr";
import { MathUtil } from "../utils/MathUtils";
import { Game } from "../views/Game";
import { EViewKey } from "../views/ViewConst";
import { ELevelConst, ILevelPrefabData, LevelConfig } from "../views/level/LevelConst";
import { LevelModel } from "../views/level/LevelModel";
import { BackgroundRoot } from "./BackgroundRoot";
import { InputManager } from "./InputManager";
import { Item } from "./Item";
import { LevelCamera } from "./LevelCamera";
import { Obstacle } from "./Obstacle";
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
 
    @property({ type: Number, tips: "地面高度Y" })
    private groundY: number;

    @property({ type: Laya.Sprite, tips: "物品根节点" })
    private itemRoot: Laya.Sprite;

    @property({ type: Laya.Sprite, tips: "障碍物根节点" })
    private obstacleRoot: Laya.Sprite;
    
    @property({ type: InputManager, tips: "关卡输入控制" })
    private inputManager: InputManager;

    private _isInit: boolean = false;

    @property({ type: Player, tips: "关卡输入控制" })
    private player: Player; 

    @property({ type: LevelCamera, tips: "关卡输入控制" })
    public levelCamera: LevelCamera;

    public backgroundRoot: BackgroundRoot;


    private _items: Item[] = [];
    private _obstacles: Obstacle[] = [];

    get spawnPoint(): [number, number] {
        const {x, y} = this.player.owner;
        return [x, y];
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

    private parsePrefabData(levelId: ELevelConst): void {
        const config = LevelConfig[levelId];
        let p: Laya.PrefabImpl = Laya.loader.getRes(config.path);
        let roots = p.data._$child as { name: string, _$child?: ILevelPrefabData[] }[];
        let itemRoot = roots.find(r => r.name === "itemRoot");
        let obstacleRoot = roots.find(r => r.name === "obstacleRoot");
        itemRoot && itemRoot._$child && itemRoot._$child.forEach(child => {
            let node = this.createPrefabData(child, this.itemRoot);
            this._items.push(node.getComponent(Item));
        });
        obstacleRoot && obstacleRoot._$child && obstacleRoot._$child.forEach(child => {
            let node = this.createPrefabData(child, this.obstacleRoot);
            this._obstacles.push(node.getComponent(Obstacle));
        });
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
        this._items.forEach(item => {
            let [obstacleX, obstacleW] = item.getGlobalCollisionRange();
            if (MathUtil.isRangesPartiallyOverlap(playerX, playerW, obstacleX, obstacleW)) {
                Game.ins.win();
            }
        });
    }

    private checkObstacleCollision(): boolean {
        const [playerX, playerW] = this.player.getGlobalCollisionRange();
        let collisionObstacle = this._obstacles.find(o => {
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

    init(levelId: number, backgroundRoot: BackgroundRoot): void {
        if (this._isInit) return;
        this._isInit = true;
        LevelModel.ins.currId = levelId;

        let realStartPos = this.obstacleRoot.x - this.spawnPoint[0];
        LevelModel.ins.setStartSpace(realStartPos);

        this.parsePrefabData(levelId);

        this.player.spawn(...this.spawnPoint);

        this.inputManager.init(this.player);

        this.levelCamera.init(this.player);
        this.levelCamera.addFollower(backgroundRoot);

        this.backgroundRoot = backgroundRoot;
    }

    recordPlayerPos(): void {
        LevelModel.ins.recordPlayerPos(this.levelCamera.distance);
    }

    reEnterLevel(levelId: number): void {
        LevelModel.ins.currId = levelId;
        this.levelCamera.backToStart();
        LevelModel.ins.resetDistance();

        this._items = [];
        this.itemRoot.destroyChildren();
        
        this._obstacles = []
        this.obstacleRoot.destroyChildren();
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