const { regClass } = Laya;
import { ViewMgr } from "../../core/UI/ViewMgr";
import { EViewKey } from "../ViewConst";
import { HudViewRTBase } from "./HudViewRT.generated";

@regClass()
export class HudViewRT extends HudViewRTBase {
    private onClickBack(): void {
        ViewMgr.ins.close(EViewKey.HudView);   
        ViewMgr.ins.close(EViewKey.HudView);   
    }
    
    onAwake(): void {
        this.btnBack.on(Laya.Event.CLICK, this.onClickBack);
    }
}