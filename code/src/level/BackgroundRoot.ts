import { Background } from "./Background";
import { CameraFollower } from "./CameraFollower";

/**
 * author: cxq
 * time: 2023/12/12 21:00:37
 * desc: 
 */
const { regClass, property } = Laya;

@regClass()
export class BackgroundRoot extends CameraFollower {
    declare owner: Laya.Sprite; 

    @property({ type: [Background], tips: "视差背景图层集合"})
    backgrounds: Background[] = [];
    @property({ type: Boolean, tips: "是否自动移动" })
    autoMove: boolean = false;

    @property({ type: Number, tips: "自动移动的速度" })
    autoMoveSpeed: number = 0;

    move(distance: number): void {
        if (distance == 0) return;
        this.backgrounds.forEach(bg => bg.move(distance));
    }
    
    onUpdate(): void {
        if (this.autoMove) {
            this.move(this.autoMoveSpeed);
        }
    }

    randomSkin(): void {
        this.setSkin(Math.floor(Math.random() * 4));    
    }

    setSkin(index: number): void {
        this.backgrounds.forEach((bg, i) => {
            bg.owner.skin = `resources/scene/bg${index}/Layer_${i}.png`;
        });
    }

    enterAnim(): void {
        Laya.Tween.from(this.owner,{ alpha: 0 }, 1000)
    }

    exitAnim(): void {
        Laya.Tween.from(this.owner,{ alpha: 0 }, 1000)
    }
}