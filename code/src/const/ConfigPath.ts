export class ConfigPath {
    static JSON_Lang = "resources/config/lang/cn.json";
    static JSON_Skin = "resources/config/skin/skin.json";
    static LH_Help = "resources/prefabs/views/Help.lh";
    static LH_MainView = "resources/prefabs/views/MainView.lh";
    static LH_SkinView = "resources/prefabs/views/SkinView.lh";

    static LEVEL_0 = "resources/prefabs/level/chapter/Level0.lh";;

    static EnterLoadList = [
        {url: ConfigPath.JSON_Skin, type: Laya.Loader.JSON},

        {url: ConfigPath.LH_Help, type: Laya.Loader.HIERARCHY},
        {url: ConfigPath.LH_MainView, type: Laya.Loader.HIERARCHY},
        {url: ConfigPath.LH_SkinView, type: Laya.Loader.HIERARCHY},

        {url: ConfigPath.LEVEL_0, type: Laya.Loader.HIERARCHY},
    ];
}