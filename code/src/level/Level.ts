import { MathUtil } from "../utils/MathUtils";
import { Game } from "../views/Game";
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

    @property({ type: ObstacleRoot })
    private obstacleRoot: ObstacleRoot;

    @property({ type: ItemRoot })
    private itemRoot: ItemRoot;

    private _isInit: boolean = false;

    public player: Player; 
    public levelCamera: LevelCamera;
    public inputManager: InputManager;
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

    init(inputManagerNode: Laya.Sprite, playerNode: Laya.Sprite, cameraNode: Laya.Sprite, backgroundRoot: BackgroundRoot): void {
        if (this._isInit) return;
        this._isInit = true;
        playerNode.pos(...this.spawnPoint);
        this.owner.addChild(playerNode);
        this.player = playerNode.getComponent(Player);

        this.owner.addChild(inputManagerNode);
        this.inputManager = inputManagerNode.getComponent(InputManager);
        this.inputManager.init(this.player);

        this.owner.addChild(cameraNode);
        this.levelCamera = cameraNode.getComponent(LevelCamera);
        this.levelCamera.init(this.player);
        this.levelCamera.addFollower(backgroundRoot);
        this.levelCamera.addFollower(this.itemRoot);
        this.levelCamera.addFollower(this.obstacleRoot);

        this.backgroundRoot = backgroundRoot;

        this.obstacleRoot.alignToHeight(this.groundY);
    }

    recordPlayerPos(): void {
        LevelModel.ins.recordPlayerPos(this.levelCamera.distance);
    }

    restart(): void {
        this.levelCamera.backToStart();
        LevelModel.ins.resetDistance();
    }

    scrollTo(pos: number): void {
        this.player.hide();
        this.inputManager.enabled = false;
        this.levelCamera.scrollTo(pos, Laya.Handler.create(this, () => {
            this.player.show();
            this.inputManager.enabled = true;
        }, null, true));
    }
    
}