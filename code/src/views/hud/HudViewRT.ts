const { regClass } = Laya;
import { ViewMgr } from "../../core/UI/ViewMgr";
import { Game } from "../Game";
import { EViewKey } from "../ViewConst";
import { HudViewRTBase } from "./HudViewRT.generated";

@regClass()
export class HudViewRT extends HudViewRTBase {
    private onClickBack(): void {
        Game.ins.pause();
    }
    
    onAwake(): void {
        this.btnBack.on(Laya.Event.CLICK, this.onClickBack);
    }
}