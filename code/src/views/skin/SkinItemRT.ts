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
            let isIdle = status == ESkinItemStatus.Idle;
            let isLocked = status == ESkinItemStatus.Locked;
            let isWorking = status == ESkinItemStatus.Adventure;
            this.imgBg.skin = PathUtils.getUiImage(isLocked ? "com_box_2" : "com_box_1");
            this.imgAvatarBg.skin = PathUtils.getUiImage(isLocked ? "img_avatar_bg_2" : "img_avatar_bg_1");
            this.imgVideo.visible = isLocked;
            this.imgAdventuring.visible = isWorking;
            this.btnUnlock.visible = isLocked;
            this.btnAdventure.visible = isIdle;
        }
    }
}