export enum EViewKey {
    HudView = "HudView",
    PauseView = "PauseView",
    HelpView = "HelpView",
    MainView = "MainView",
    SkinView = "SkinView",
}

export enum EViewLayer {
    Bg = "bg",
    Battle = "battle",
    UI = "ui_full",
    UISystem = "ui_main",
    UIPopup = "ui_popup",
    UIMsg = "ui_msg",
    UIGuide = "ui_guide",
    UILoading = "ui_loading",
    UIAlert = "ui_alert",
}

export const ViewLayerZOrder: [EViewLayer, number][] = [
    /**Bg层 */
    [EViewLayer.Bg, 10],
    /**fight层 */
    [EViewLayer.Battle, 20],
    /**UI层 */
    [EViewLayer.UI, 100],
    /**一级窗口UI层 */
    [EViewLayer.UISystem, 200],
    /**二级弹窗UI层 */
    [EViewLayer.UIPopup, 300],
    /**飘字信息UI层 */
    [EViewLayer.UIMsg, 400],
    /**引导层 */
    [EViewLayer.UIGuide, 500],
    /**loading */
    [EViewLayer.UILoading, 600],
    /**提示窗口层 */
    [EViewLayer.UIAlert, 700],
];