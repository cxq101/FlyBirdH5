const { regClass } = Laya;
import { Game } from "../Game";
import { WinViewRTBase } from "./WinViewRT.generated";

@regClass()
export class WinViewRT extends WinViewRTBase {
    private _timeLine: Laya.TimeLine;
    private onClickContinue(): void {
        Game.ins.nextLevel();
    }

    onAwake(): void {
        this._timeLine = new Laya.TimeLine();
        this._timeLine.from(this.imgSilver, { scaleX: 0, scaleY: 0, alpha: 0 }, 600, Laya.Ease.bounceOut);
        this._timeLine.from(this.imgReceived, { scaleX: 5, scaleY: 5, alpha: 0 }, 600, Laya.Ease.bounceOut);
        this.btnClose.on(Laya.Event.CLICK, this, this.onClickContinue);
        this.btnContinue.on(Laya.Event.CLICK, this, this.onClickContinue);
    }

    onEnable(): void {
        this._timeLine.play(0, false);
    }

    onDisable(): void {
        this._timeLine.pause();
    }
    
    onDestroy(): void {
        this._timeLine.destroy();
        this._timeLine = null;
    }
}