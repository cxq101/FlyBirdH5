import { ViewMgr } from "../core/UI/ViewMgr";
import { MathUtil } from "../utils/MathUtils";
import { Game } from "../views/Game";
import { EViewKey } from "../views/ViewConst";
import { ELevelConst, ILevelPrefabData, LevelConfig } from "../views/level/LevelConst";
import { LevelModel } from "../views/level/LevelModel";
import { BackgroundRoot } from "./BackgroundRoot";
import { Ground } from "./Ground";
import { InputManager } from "./InputManager";
import { Item } from "./Item";
import { LevelCamera } from "./LevelCamera";
import { LevelParseHelper } from "./LevelParseHelper";
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
 
    @property({ type: Laya.Sprite, tips: "地面根节点" })
    private groundRoot: Laya.Sprite;

    @property({ type: Laya.Sprite, tips: "障碍物根节点" })
    private obstacleRoot: Laya.Sprite;

    @property({ type: Laya.Sprite, tips: "物品根节点" })
    private itemRoot: Laya.Sprite;
    
    @property({ type: InputManager, tips: "关卡输入控制" })
    private inputManager: InputManager;

    @property({ type: Player, tips: "角色" })
    private player: Player; 

    @property({ type: LevelCamera, tips: "相机控制" })
    public levelCamera: LevelCamera;

    public backgroundRoot: BackgroundRoot;

    private _items: Item[] = [];
    private _grounds: Ground[] = [];
    private _isInit: boolean = false;
    private _obstacles: Obstacle[] = [];

    get spawnPoint(): [number, number] {
        const {x, y} = this.player.owner;
        return [x, y];
    }

    private parsePrefabData(levelId: ELevelConst): void {
        LevelParseHelper.parse(levelId, [
            { name: "itemRoot", root: this.itemRoot, components: this._items, component: Item },
            { name: "groundRoot", root: this.groundRoot, components: this._grounds, component: Ground },
            { name: "obstacleRoot", root: this.obstacleRoot, components: this._obstacles, component: Obstacle },
        ]);
    }

    private checkCollision(): void {
        const playerRect = this.player.collisionBox;
        // 
        let item = this.tryCheckCollision(playerRect, this._items);
        if (item) {
            let index = this._items.findIndex(i => i == item);
            item.owner.destroy();
            this._items.splice(index, 1);
            Game.ins.win();
            return;
        };

        let obstacle = this.tryCheckCollision(playerRect, this._obstacles);
        if (obstacle) {
            this.player.addForce(obstacle.force, obstacle.degrees);
            return;
        };
        
        let ground = this.tryCheckCollision(playerRect, this._grounds);
        const newIsGround = ground != null;
        const lastIsGround = this.player.isGround;
        if (lastIsGround != newIsGround) {
            this.player.isGround = newIsGround;
            // 落地
            if (newIsGround) {
                this.player.stop();
                this.recordPlayerPos();            
                this.player.owner.y = ground.owner.y;
            }
        }
    }

    private tryCheckCollision<T extends { collisionBox: Laya.Rectangle }>(playerRect: Laya.Rectangle, list: T[]): T {
        return list.find(i => i.collisionBox.intersects(playerRect));
    }

    onUpdate(): void {
        if (!this._isInit) return;
        this.checkCollision();
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
        
        this._grounds = [];
        this.groundRoot.destroyChildren();
        
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