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

    obstacles: Obstacle[] = [];

    move(distance: number): void {
        this.owner.x += distance;
    }

    addItemNode(node: Laya.Node): void {
        let obstacle = node.getComponent(Obstacle);
        obstacle && this.obstacles.push(obstacle);
    }

    alignToHeight(h: number): void {
        this.obstacles.forEach(o => o.owner.y = h);
    }

    removeAllObstacles(): void {
        this.obstacles.forEach(o => {
            o.owner.destroy();
        });
        this.obstacles = [];
    }

    onDestroy(): void {
        this.obstacles = [];
    }
}