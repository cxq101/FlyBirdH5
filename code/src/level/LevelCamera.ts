/**
 * author: cxq
 * time: 2023/12/13 08:48:23
 * desc: 
 */

import { BackgroundRoot } from "./BackgroundRoot";
import { ObstacleRoot } from "./ObstacleRoot";
import { Player } from "./Player";

const { regClass, property } = Laya;

@regClass()
export class LevelCamera extends Laya.Script {
    declare owner: Laya.Sprite;

    @property({ type: Player })
    player: Player;

    @property({ type: BackgroundRoot })
    backgroundRoot: BackgroundRoot;

    @property({ type: ObstacleRoot })
    obstacleRoot: ObstacleRoot;

    private totalDistance: number = 0;
    
    onUpdate(): void {
        const velocityX = this.player.velocityX;
        if (velocityX == 0) return;
        let distance = velocityX * Laya.timer.delta * 0.001;
        this.totalDistance += distance;
        this.obstacleRoot.move(-distance);
        this.backgroundRoot.move(-distance);
    }
}