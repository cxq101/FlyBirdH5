const { regClass } = Laya;
import { Game } from "../Game";
import { WinGoldViewRTBase } from "./WinGoldViewRT.generated";

@regClass()
export class WinGoldViewRT extends WinGoldViewRTBase {
    private _timeLine: Laya.TimeLine;
    private onClickHome(): void {
        Game.ins.backHome();
    }

    private onClickAgain(): void {
        Game.ins.restartLevel();
    }
    
    onAwake(): void {
        this._timeLine = new Laya.TimeLine();
        this._timeLine.from(this.imgGold, { scaleX: 0, scaleY: 0, alpha: 0 }, 600, Laya.Ease.bounceOut);
        this._timeLine.from(this.imgReceived, { scaleX: 5, scaleY: 5, alpha: 0 }, 600, Laya.Ease.bounceOut);
        this.btnHome.on(Laya.Event.CLICK, this.onClickHome); 
        this.btnAgain.on(Laya.Event.CLICK, this.onClickAgain); 
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