const { regClass } = Laya;
import { Game } from "../Game";
import { LevelModel } from "../level/LevelModel";
import { SkinModel } from "../skin/SkinModel";
import { PauseViewRTBase } from "./PauseViewRT.generated";

@regClass()
export class PauseViewRT extends PauseViewRTBase {
    private updateView(): void {
        let isPracticeMode = LevelModel.ins.isPracticeMode();
        this.boxNormal.visible = !isPracticeMode;
        this.boxPractice.visible = isPracticeMode;

        if (isPracticeMode) {
            let isNewRecord = LevelModel.ins.checkExistNewRecord();
            this.imgNewRecord.visible = isNewRecord;
            this.lblCurrentScore.text = LevelModel.ins.currTopDistanceFormat.toString();
            isNewRecord && LevelModel.ins.saveNewRecord();
            this.lblHistoryScore.text = LevelModel.ins.currHistoryTopDistanceFormat.toString();
        } else {
            this.imgIcon.skin = SkinModel.ins.getCurrentSkin();
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