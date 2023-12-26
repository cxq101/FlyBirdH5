const { regClass } = Laya;
import { Game } from "../Game";
import { WinGoldViewRTBase } from "./WinGoldViewRT.generated";

@regClass()
export class WinGoldViewRT extends WinGoldViewRTBase {
    private onClickHome(): void {
        Game.ins.backHome();
    }

    private onClickAgain(): void {
        Game.ins.restartLevel();
    }
    
    onAwake(): void {
        this.btnHome.on(Laya.Event.CLICK, this.onClickHome); 
        this.btnAgain.on(Laya.Event.CLICK, this.onClickAgain); 
    }
}