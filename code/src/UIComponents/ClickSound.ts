/**
 * author: cxq
 * time: 2023/12/27 14:36:23
 * desc: 
 */
const { regClass, classInfo, property } = Laya;

@regClass()
@classInfo({ menu: "UI" })
export class ClickSound extends Laya.Script {
    //加载Image资源类型，设置资源路径格式
    @property({ type: String, isAsset: true, assetTypeFilter: "Audio" })
    private sound: string;

    onMouseDown(evt: Laya.Event): void {
        Laya.SoundManager.playSound(this.sound);
    }
}