const { regClass } = Laya;
import { ViewMgr } from "../../core/UI/ViewMgr";
import { Game } from "../Game";
import { EViewKey } from "../ViewConst";
import { LevelConst } from "../level/LevelConst";
import { MainViewRTBase } from "./MainViewRT.generated";

@regClass()
export class MainViewRT extends MainViewRTBase {
    private onClickHelp(): void {
        ViewMgr.ins.open(EViewKey.HelpView);
    }

    private onClickSkin(): void {
        ViewMgr.ins.open(EViewKey.SkinView);
    }

    private onClickPlay(): void {
        Game.ins.enterLevel(LevelConst.LevelPracticeId);
    }

    onAwake(): void {
        this.btnHelp.on(Laya.Event.CLICK, this.onClickHelp);
        this.btnSkin.on(Laya.Event.CLICK, this.onClickSkin);
        this.btnPlay.on(Laya.Event.CLICK, this.onClickPlay);
    }
}