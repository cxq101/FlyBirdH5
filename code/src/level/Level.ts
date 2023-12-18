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

    @property({ type: ObstacleRoot })
    private obstacleRoot: ObstacleRoot;

    get spawnPoint(): [number, number] {
        const {x, y} = this.spawnPointNode;
        return [x, y];
    }

    public player: Player; 
    public levelCamera: LevelCamera;
    public inputManager: InputManager;
    public backgroundRoot: BackgroundRoot;

    private checkCollision(): void {
        if (!this.player.isGround) return;
        const playerBounds = this.player.owner.getBounds();
        this.obstacleRoot.obstacles.forEach(o => {
            let obstaclesBounds = (o.owner as Laya.Sprite).getBounds().clone();
            obstaclesBounds.x += this.owner.x;
            if (obstaclesBounds.intersects(playerBounds)) {
                this.player.addForce(o.force, o.degrees);
            }
        });
    }

    init(inputManagerNode: Laya.Sprite, playerNode: Laya.Sprite, cameraNode: Laya.Sprite, backgroundRoot: BackgroundRoot): void {
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
    }
    
    onUpdate(): void {
        this.checkCollision();
    }
}