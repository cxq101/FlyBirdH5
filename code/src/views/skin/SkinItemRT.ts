const { regClass } = Laya;
import { PathUtils } from "../../utils/PathUtils";
import { ESkinItemStatus } from "./SkinConst";
import { SkinItemRTBase } from "./SkinItemRT.generated";

@regClass()
export class SkinItemRT extends SkinItemRTBase {
    get dataSource(): any {
        return super.dataSource;
    }

    set dataSource(value: any) {
        super.dataSource = value;
        if (!value) return;
        let status = value.status;
        if (status != null) {
            let isLocked = status == ESkinItemStatus.Locked;
            let isWorking = status == ESkinItemStatus.Adventure;
            this.imgBg.skin = PathUtils.getUiImage(isLocked ? "CommonBox2" : "CommonBox3");
            this.imgVideo.visible = isLocked;
            this.lblUsing.visible = isWorking;
            this.btnUnlockOrUse.visible = !isWorking;
            this.btnUnlockOrUse.label = isLocked ? "SkinView2" : "SkinView1";
        }
    }
}