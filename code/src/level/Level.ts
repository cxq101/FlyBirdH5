import { BackgroundRoot } from "./BackgroundRoot";
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
 
    public backgroundRoot: BackgroundRoot;

    private _playerMoveDistance: number = 0;

    init(playerNode: Laya.Sprite, backgroundRoot: BackgroundRoot): void {
        this.backgroundRoot = backgroundRoot;
        this.player = playerNode.getComponent(Player);
    }
    
    onUpdate(): void {
        if (!this.player) return;
        const velocityX = this.player.velocityX;
        if (velocityX == 0) return;
        let distance = velocityX * Laya.timer.delta * 0.001;
        this._playerMoveDistance += distance;
        this.obstacleRoot.move(-distance);
        this.backgroundRoot.move(-distance);
    }
}