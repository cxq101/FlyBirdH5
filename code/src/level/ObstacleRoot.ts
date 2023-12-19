import { Obstacle } from "./Obstacle";

/**
 * author: cxq
 * time: 2023/12/12 21:32:32
 * desc: 
 */
const { regClass, property } = Laya;

@regClass()
export class ObstacleRoot extends Laya.Script {
    declare owner: Laya.Sprite;

    @property({ type: [Obstacle] })
    obstacles: Obstacle[] = [];

    move(distance: number): void {
        this.owner.x += distance;
    }

    alignToHeight(h: number): void {
        this.obstacles.forEach(o => o.owner.y = h);
    }
}