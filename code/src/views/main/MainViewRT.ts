const { regClass } = Laya;
import { ViewMgr } from "../../core/UI/ViewMgr";
import { EViewKey } from "../ViewConst";
import { MainViewRTBase } from "./MainViewRT.generated";

@regClass()
export class MainViewRT extends MainViewRTBase {
    private onClickHelp(): void {
        ViewMgr.ins.open(EViewKey.HelpView);
    }

    private onClickSkin(): void {
        ViewMgr.ins.open(EViewKey.SkinView);
    }

    onAwake(): void {
        this.btnHelp.on(Laya.Event.CLICK, this.onClickHelp);
        this.btnSkin.on(Laya.Event.CLICK, this.onClickSkin);
    }
}