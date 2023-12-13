import { Background } from "./Background";
import { Obstacle } from "./Obstacle";
import { Player } from "./Player";

/**
 * author: cxq
 * time: 2023/12/12 21:32:32
 * desc: 
 */
const { regClass, property } = Laya;

@regClass()
export class ObstacleRoot extends Laya.Script {
    declare owner: Laya.Sprite;

    @property({ type: Player })
    private player: Player;

    @property({ type: [Obstacle] })
    private obstacles: Obstacle[] = [];


    move(distance: number): void {
        this.owner.x += distance;
    }

    checkCollision(): void {
        if (!this.player.isGround) return;
        const playerBounds = this.player.owner.getBounds();
        this.obstacles.forEach(o => {
            let obstaclesBounds = (o.owner as Laya.Sprite).getBounds().clone();
            obstaclesBounds.x += this.owner.x;
            if (obstaclesBounds.intersects(playerBounds)) {
                this.player.addForce(o.force, o.degrees);
            }
        });
    }

    checkDisplay(): void {
        
    }

    onUpdate(): void {
        this.checkCollision();
    }
}