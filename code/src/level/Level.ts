import { MathUtil } from "../utils/MathUtils";
import { BackgroundRoot } from "./BackgroundRoot";
import { InputManager } from "./InputManager";
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

    private checkPlayerGround(): void {
        if (!this._isInit) return;
        const currState = this.player.isGround;
        const isGround = this.player.isBelowHeight(this.groundY);
        this.player.isGround = isGround;
        if (!currState && isGround) {
            this.player.stop();
            this.player.owner.y = this.groundY;
        }
    }

    private getRang(sp: Laya.Sprite): [number, number] {
        let p = Laya.Point.create();
        sp.localToGlobal(p);
        return [p.x, p.x + sp.width];
    }

    private checkCollision(): void {
        if (!this._isInit) return;
        if (!this.player.isGround) return;
        const [playerX, playerW] = this.getRang(this.player.owner);
        this.obstacleRoot.obstacles.forEach(o => {
            let [obstacleX, obstacleW] = this.getRang(o.owner as Laya.Sprite);
            if (MathUtil.isRangesPartiallyOverlap(playerX, playerW, obstacleX, obstacleW)) {
                this.player.addForce(o.force, o.degrees);
            }
        });
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
        this.levelCamera.addFollower(this.obstacleRoot);

        this.backgroundRoot = backgroundRoot;

        this.obstacleRoot.alignToHeight(this.groundY);
    }
    
    onUpdate(): void {
        this.checkPlayerGround();
        this.checkCollision();
    }
}