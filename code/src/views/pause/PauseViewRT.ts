const { regClass } = Laya;
import { Game } from "../Game";
import { PauseViewRTBase } from "./PauseViewRT.generated";

@regClass()
export class PauseViewRT extends PauseViewRTBase {
    private onClickResume(): void {
        Game.ins.resume();
    }

    private onClickRestart(): void {
        Game.ins.restartLevel();
    }

    private onClickMainMenu(): void {
        Game.ins.backHome();
    }
    
    onAwake(): void {
        this.btnResume.on(Laya.Event.CLICK, this.onClickResume); 
        this.btnRestart.on(Laya.Event.CLICK, this.onClickRestart); 
        this.btnMainMenu.on(Laya.Event.CLICK, this.onClickMainMenu); 
    }
}