import { ConfigPath } from "../const/ConfigPath";
import { ViewMgr } from "../core/UI/ViewMgr";
import { Game } from "../views/Game";
import { EViewKey } from "../views/ViewConst";
import { ELevelConst } from "../views/level/LevelConst";
import { LevelModel } from "../views/level/LevelModel";
import { BackgroundRoot } from "./BackgroundRoot";
import { InputManager } from "./InputManager";
import { EItemType } from "./Item/EItemType";
import { LevelCamera } from "./LevelCamera";
import { Player } from "./Player";
import { LevelNodeManager } from "./levelParse/LevelNodeManager";

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
    private moveRoot: Laya.Sprite;

    @property({ type: Laya.Sprite, tips: "地面根节点" })
    private groundRoot: Laya.Sprite;

    @property({ type: Laya.Sprite, tips: "障碍物根节点" })
    private obstacleRoot: Laya.Sprite;

    @property({ type: Laya.Sprite, tips: "物品根节点" })
    private itemRoot: Laya.Sprite;

    @property({ type: Laya.Sprite, tips: "特效根节点" })
    private effectRoot: Laya.Sprite;

    @property({ type: Laya.Sprite, tips: "ui根节点" })
    private uiRoot: Laya.Sprite;
    
    @property({ type: InputManager, tips: "关卡输入控制" })
    private inputManager: InputManager;
    
    @property({ type: LevelNodeManager, tips: "关卡节点管理" })
    private nodeManager: LevelNodeManager;

    @property({ type: Player, tips: "角色" })
    private player: Player; 

    @property({ type: LevelCamera, tips: "相机控制" })
    public levelCamera: LevelCamera;
    @property({ type: ["Record", Number], tips: "配置" })
    public config: Record<string, number>; 

    @property({ type: Laya.Animation, tips: "受击特效" })
    private animHurt: Laya.Animation;
    @property({ type: Laya.Animation, tips: "落地特效" })
    private animDust: Laya.Animation;
    
    public backgroundRoot: BackgroundRoot;

    private _isInit: boolean = false;
    private _enabledCollision: boolean = true;

    get spawnPoint(): [number, number] {
        const {x, y} = this.player.owner;
        return [x, y];
    }

    private parsePrefabData(levelId: ELevelConst, offset: number): void {
        this.nodeManager.init(levelId, offset);
    }

    private checkCollision(): void {
        const playerRect = this.player.collisionBox;
        // 
        let items = this.nodeManager.items;
        let item = this.tryCheckCollision(playerRect, items);
        // trigger
        if (item && item.type == EItemType.FinalAward && !Game.ins.isWin()) {
            Game.ins.win();
        };
        if (item && item.type == EItemType.FoCat) {
            item.collisionEvent();
        };
        // collision
        let obstacles = this.nodeManager.obstacles;
        let obstacle = this.tryCheckCollision(playerRect, obstacles);
        if (obstacle) {
            this.player.addForce(obstacle.force, obstacle.degrees);
            this.showHurtEffect();
            Laya.SoundManager.playSound(ConfigPath.M_CatHurt);
            return;
        };
        
        let grounds = this.nodeManager.grounds;
        let ground = this.tryCheckCollision(playerRect, grounds);
        const newIsGround = ground != null;
        const lastIsGround = this.player.isGround;
        if (lastIsGround != newIsGround) {
            this.player.isGround = newIsGround;
            // 落地
            if (newIsGround) {
                this.player.stop();
                this.recordPlayerPos();            
                this.showDustEffect();
                this.player.owner.y = ground.owner.y;
                Laya.SoundManager.playSound(ConfigPath.M_Foot);
            }
        }
    }

    private tryCheckCollision<T extends { collisionBox: Laya.Rectangle }>(playerRect: Laya.Rectangle, list: T[]): T {
        return list.find(i => i.collisionBox.intersects(playerRect));
    }

    private onAnimDustComplete(): void {
        this.animDust.visible = false;
    }

    private onAnimHurtComplete(): void {
        this.animHurt.visible = false;
    }

    onAwake(): void {
        this.animDust.on(Laya.Event.COMPLETE, this, this.onAnimDustComplete);
        this.animHurt.on(Laya.Event.COMPLETE, this, this.onAnimHurtComplete);
    }

    onUpdate(): void {
        if (!this._isInit) return;
        if (this._enabledCollision) {
            this.checkCollision();
        } 
    }

    onDestroy(): void {
        LevelModel.ins.resetDistance();
    }

    init(levelId: number, backgroundRoot: BackgroundRoot): void {
        if (this._isInit) return;
        this._isInit = true;
        // levelId = ELevelConst.Level_10002;
        LevelModel.ins.currId = levelId;

        let startLine = this.config[levelId];
        this.moveRoot.x = startLine;
        this.uiRoot.x = -startLine;
        let realStartPos = startLine - this.spawnPoint[0];
        LevelModel.ins.setStartSpace(realStartPos);


        this.parsePrefabData(levelId, startLine);

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

        let startLine = this.config[levelId];
        this.moveRoot.x = startLine;
        this.uiRoot.x = -startLine;
        let realStartPos = startLine - this.spawnPoint[0];
        LevelModel.ins.setStartSpace(realStartPos);

        this.nodeManager.clear();
        this.parsePrefabData(levelId, startLine);
    }

    restart(): void {
        this.reEnterLevel(LevelModel.ins.currId);
    }

    scrollTo(pos: number): void {
        this.player.hide();
        this._enabledCollision = false;
        this.inputManager.enabled = false;
        LevelModel.ins.isScrollClose = true;
        ViewMgr.ins.close(EViewKey.HudView);
        this.levelCamera.scrollTo(pos, Laya.Handler.create(this, () => {
            this.player.show();
            this._enabledCollision = true;
            this.inputManager.enabled = true;
            LevelModel.ins.scrollEnd();
            ViewMgr.ins.open(EViewKey.HudView);
            LevelModel.ins.isScrollClose = false;
        }, null, true));
    }

    
    showDustEffect(): void {
        this.animDust.visible = true;
        let point = this.player.getFootPoint(this.effectRoot);
        this.animDust.pos(point.x, point.y);
        this.animDust.play(0, false);
    }

    showHurtEffect(): void {
        this.animHurt.visible = true;
        let point = this.player.getFootPoint(this.effectRoot);
        this.animHurt.pos(point.x, point.y);
        this.animHurt.play(0, false);
    }
}