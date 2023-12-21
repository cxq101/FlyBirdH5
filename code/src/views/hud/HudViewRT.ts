const { regClass } = Laya;
import { Game } from "../Game";
import { LevelEvent } from "../level/LevelConst";
import { LevelModel } from "../level/LevelModel";
import { SkinModel } from "../skin/SkinModel";
import { HudViewRTBase } from "./HudViewRT.generated";

@regClass()
export class HudViewRT extends HudViewRTBase {
    private updateView(): void {
        this.updateDistance();
        this.updateProgress();
        this.updateScrollButton();
    }

    private updateProgress(): void {
        const isShowProgress = LevelModel.ins.isShowProgress();
        this.progress.visible = isShowProgress;
        if (isShowProgress) {
            this.imgHead.skin = SkinModel.ins.getCurrentSkinHead();
            this.progress.value = LevelModel.ins.currDistanceFormat * 0.01;
            this.imgHead.x = this.progress.width * this.progress.value;
        }
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

    private onClickContinue(): void {
        this.btnBack.visible = true;
        this.boxMask.visible = false;
    }

    onAwake(): void {
        this.btnBack.on(Laya.Event.CLICK, this, this.onClickBack);
        this.btnScroll.on(Laya.Event.CLICK, this, this.onClickScroll);
        this.btnContinue.on(Laya.Event.CLICK, this, this.onClickContinue);
    }

    onEnable(): void {
        if (LevelModel.ins.isScrollClose) {
            this.btnBack.visible = false;
            this.boxMask.visible = true;
        }
        this.updateView();
        LevelModel.ins.on(LevelEvent.DistanceChanged, this, this.updateView);
    }
}