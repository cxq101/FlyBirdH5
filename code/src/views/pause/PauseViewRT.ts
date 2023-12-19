const { regClass } = Laya;
import { Game } from "../Game";
import { LevelModel } from "../level/LevelModel";
import { PauseViewRTBase } from "./PauseViewRT.generated";

@regClass()
export class PauseViewRT extends PauseViewRTBase {
    private updateView(): void {
        const current = LevelModel.ins.currLevelTopDistanceFormat;
        const history = LevelModel.ins.currLevelHistoryTopDistanceFormat;
        const isNewRecord = current > history;
        this.lblCurrentScore.text = current.toString();
        this.lblHistoryScore.text = isNewRecord ? current.toString() : history.toString();
        this.imgNewRecord.visible = isNewRecord;
        if (isNewRecord) {
            LevelModel.ins.newRecord();
        }
    }

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

    onEnable(): void {
        this.updateView();
    }
}