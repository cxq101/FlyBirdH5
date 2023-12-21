export class ConfigPath {
    static JSON_Lang = "resources/config/lang/cn.json";
    static JSON_Skin = "resources/config/skin/skin.json";

    static LH_Hud = "resources/prefabs/views/HUD.lh";
    static LH_Help = "resources/prefabs/views/Help.lh";
    static LH_MainView = "resources/prefabs/views/MainView.lh";
    static LH_SkinView = "resources/prefabs/views/SkinView.lh";
    static LH_PauseView = "resources/prefabs/views/PauseView.lh";
    static LH_WinView = "resources/prefabs/views/WinView.lh";

    static LH_Level_10000 = "resources/prefabs/level/chapter/Level_10000.lh";
    static LH_Level_10001 = "resources/prefabs/level/chapter/Level_10001.lh";
    static LH_Level_10002 = "resources/prefabs/level/chapter/Level_10002.lh";

    static EnterLoadList = [
        {url: ConfigPath.JSON_Skin, type: Laya.Loader.JSON},

        {url: ConfigPath.LH_Hud, type: Laya.Loader.HIERARCHY},
        {url: ConfigPath.LH_Help, type: Laya.Loader.HIERARCHY},
        {url: ConfigPath.LH_MainView, type: Laya.Loader.HIERARCHY},
        {url: ConfigPath.LH_SkinView, type: Laya.Loader.HIERARCHY},
        {url: ConfigPath.LH_PauseView, type: Laya.Loader.HIERARCHY},
        {url: ConfigPath.LH_WinView, type: Laya.Loader.HIERARCHY},

        {url: ConfigPath.LH_Level_10000, type: Laya.Loader.HIERARCHY},
        {url: ConfigPath.LH_Level_10001, type: Laya.Loader.HIERARCHY},
        {url: ConfigPath.LH_Level_10002, type: Laya.Loader.HIERARCHY},
    ];
}