/**
 * author: cxq
 * time: 2023/12/22 16:21:02
 * desc: 
 */
const { regClass, property } = Laya;

@regClass()
export class CameraFollower extends Laya.Script {
    declare owner: Laya.Sprite;

    move(distance: number): void {
        this.owner.x += distance;
    }
}