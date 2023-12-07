const { regClass } = Laya;
import { ViewMgr } from "../../core/UI/ViewMgr";
import { EViewKey } from "../ViewConst";
import { HelpViewRTBase } from "./HelpViewRT.generated";

@regClass()
export class HelpViewRT extends HelpViewRTBase {
    private onClickClose(): void {
        ViewMgr.ins.close(EViewKey.Test);
    }
    
    onAwake(): void {
        this.btnClose.on(Laya.Event.CLICK, this.onClickClose);
    }

}