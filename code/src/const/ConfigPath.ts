export class ConfigPath {
    static Lang = "resources/config/lang/cn.json";
    static LHHelp = "resources/prefabs/views/Help.lh";

    static EnterLoadList = [
        {url: ConfigPath.Lang, type: Laya.Loader.JSON},
        {url: ConfigPath.LHHelp, type: Laya.Loader.HIERARCHY},
    ];
}