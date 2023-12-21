const { regClass } = Laya;
import { Game } from "../Game";
import { LevelEvent } from "../level/LevelConst";
import { LevelModel } from "../level/LevelModel";
import { HudViewRTBase } from "./HudViewRT.generated";

@regClass()
export class HudViewRT extends HudViewRTBase {
    private updateView(): void {
        this.updateDistance();
        this.updateScrollButton();
    }

    private updateDistance(): void {
        const isPractice = LevelModel.ins.isPracticeMode();
        this.lblDistance.visible = isPractice;
        if (isPractice) {
            const distance = LevelModel.ins.currDistanceFormat;
            this.lblDistance.text = `当前距离：${distance}`;
        }
    }

    private updateScrollButton(): void {
        const isExistTop = LevelModel.ins.isExistTop();
        this.btnScroll.visible = isExistTop;
    }

    private onClickBack(): void {
        Game.ins.pause();
    }

    private onClickScroll(): void {
        Game.ins.scrollTo(LevelModel.ins.currTopDistance);
    }

    onAwake(): void {
        this.btnBack.on(Laya.Event.CLICK, this.onClickBack);
        this.btnScroll.on(Laya.Event.CLICK, this.onClickScroll);
    }

    onEnable(): void {
        this.updateView();
        LevelModel.ins.on(LevelEvent.DistanceChanged, this, this.updateView);
    }
}