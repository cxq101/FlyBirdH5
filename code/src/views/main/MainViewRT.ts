const { regClass } = Laya;
import { ConfigPath } from "../../const/ConfigPath";
import { ViewMgr } from "../../core/UI/ViewMgr";
import { Game } from "../Game";
import { EViewKey } from "../ViewConst";
import { ELevelConst } from "../level/LevelConst";
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
        Game.ins.enterLevel(ELevelConst.Level_10001);
    }

    private onClickTest(): void {
        Game.ins.enterLevel(ELevelConst.LevelTestId);
    }
    
    onAwake(): void {
        this.btnHelp.on(Laya.Event.CLICK, this.onClickHelp);
        this.btnSkin.on(Laya.Event.CLICK, this.onClickSkin);
        this.btnPlay.on(Laya.Event.CLICK, this.onClickPlay);
        this.btnTest.on(Laya.Event.CLICK, this.onClickTest);
    }
}