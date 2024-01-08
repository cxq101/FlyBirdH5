const { regClass } = Laya;
import { Game } from "../Game";
import { WinViewRTBase } from "./WinViewRT.generated";

@regClass()
export class WinViewRT extends WinViewRTBase {
    private onClickContinue(): void {
        Game.ins.nextLevel();
    }

    onAwake(): void {
        this.btnClose.on(Laya.Event.CLICK, this, this.onClickContinue);
        this.btnContinue.on(Laya.Event.CLICK, this, this.onClickContinue);
    }
}