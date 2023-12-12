import { Background } from "./Background";
import { Player } from "./Player";

/**
 * author: cxq
 * time: 2023/12/12 21:00:37
 * desc: 
 */
const { regClass, property } = Laya;

@regClass()
export class BackgroundRoot extends Laya.Script {
    @property({ type: [Background] })
    backgrounds: Background[] = [];

    @property({ type: Player })
    player: Player;
    
    private onVelocityChanged(v: number): void {
        this.backgrounds.forEach(bg => {
            bg.velocity = -v;
        })
    }

    onStart(): void {
        this.player.velocityHandler = new Laya.Handler(this, this.onVelocityChanged);
    }
}