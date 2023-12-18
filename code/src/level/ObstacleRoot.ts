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

    @property({ type: [Obstacle] })
    obstacles: Obstacle[] = [];

    move(distance: number): void {
        this.owner.x += distance;
    }
}