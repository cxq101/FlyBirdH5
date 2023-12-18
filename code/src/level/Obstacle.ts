/**
 * author: cxq
 * time: 2023/12/12 21:32:32
 * desc: 
 */
const { regClass, property } = Laya;

@regClass()
export class Obstacle extends Laya.Script {
    @property({ type: Number, tips: "默认的弹跳角度" })
    degrees: number;

    @property({ type: Number, tips: "弹力" })
    force: number;

    onStart(): void {
    }

    checkCollision(): void {
        
    }

    onUpdate(): void {
    }
}
