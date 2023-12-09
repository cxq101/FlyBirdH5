const { regClass } = Laya;
import { ESkinItemStatus } from "./SkinConst";
import { SkinItemRTBase } from "./SkinItemRT.generated";

@regClass()
export class SkinItemRT extends SkinItemRTBase {
    get dataSource(): any {
        return super.dataSource;
    }

    set dataSource(value: any) {
        console.log("Skin Item  RT =========", value);
        super.dataSource = value;
        if (!value) return;
        let status = value.status;
        if (status != null) {
            let isLocked = status == ESkinItemStatus.Locked;
            let isWorking = status == ESkinItemStatus.Working;
            this.imgBg.skin = `atlas/comp/img_bg${isLocked ? 4 : 5}.png`;
            this.imgVideo.visible = isLocked;
            this.lblUsing.visible = isWorking;
            this.btnUnlockOrUse.visible = !isWorking;
            this.btnUnlockOrUse.label = isLocked ? "SkinView2" : "SkinView1";
        }
    }
}