import { Background } from "./Background";

/**
 * author: cxq
 * time: 2023/12/12 21:00:37
 * desc: 
 */
const { regClass, property } = Laya;

@regClass()
export class BackgroundRoot extends Laya.Script {
    declare owner: Laya.Sprite; 

    @property({ type: [Background] })
    backgrounds: Background[] = [];

    move(distance: number): void {
        this.backgrounds.forEach(bg => bg.move(distance));
    }

    enterAnim(): void {
        Laya.Tween.from(this.owner,{ alpha: 0 }, 1000)
    }

    exitAnim(): void {
        Laya.Tween.from(this.owner,{ alpha: 0 }, 1000)
    }
}