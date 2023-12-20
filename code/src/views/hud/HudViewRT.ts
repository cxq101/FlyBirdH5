const { regClass } = Laya;
import { Game } from "../Game";
import { LevelEvent } from "../level/LevelConst";
import { LevelModel } from "../level/LevelModel";
import { HudViewRTBase } from "./HudViewRT.generated";

@regClass()
export class HudViewRT extends HudViewRTBase {
    private updateDistance(): void {
        const distance = LevelModel.ins.currLevelDistanceFormat;
        this.lblDistance.text = `当前距离：${distance}`;
    }

    private onClickBack(): void {
        Game.ins.pause();
    }

    private onClickScroll(): void {
        Game.ins.scrollTo(LevelModel.ins.currLevelTopDistance);
    }

    private onDistanceChanged(): void {
        this.updateDistance();
    }
    
    onAwake(): void {
        this.btnBack.on(Laya.Event.CLICK, this.onClickBack);
        this.btnScroll.on(Laya.Event.CLICK, this.onClickScroll);
    }

    onEnable(): void {
        this.updateDistance();
        LevelModel.ins.on(LevelEvent.DistanceChanged, this, this.onDistanceChanged);
    }
}