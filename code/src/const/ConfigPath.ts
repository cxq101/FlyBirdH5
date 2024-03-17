export class ConfigPath {
    static JSON_Lang = "resources/config/lang/cn.json";
    static JSON_Skin = "resources/config/skin/skin.json";
    static JSON_Dialog = "resources/config/dialog.json";

    static M_Foot = "resources/sound/Foot.mp3";
    static M_Main = "resources/sound/m_main.mp3";
    static M_CatHurt = "resources/sound/CatHurt.mp3";
    static M_CatJump = "resources/sound/CatJump.mp3";
    static M_UI_Click = "resources/sound/UI_Click.mp3";
    static M_UI_Back = "resources/sound/UI_Back.mp3";
    static M_UI_Forward = "resources/sound/UI_Forward.mp3";
    static M_UI_Success = "resources/sound/UI_Success.mp3";
    
    static LH_Hud = "resources/prefabs/views/HUD.lh";
    static LH_Help = "resources/prefabs/views/Help.lh";
    static LH_MainView = "resources/prefabs/views/MainView.lh";
    static LH_SkinView = "resources/prefabs/views/SkinView.lh";
    static LH_PauseView = "resources/prefabs/views/PauseView.lh";
    static LH_WinView = "resources/prefabs/views/WinView.lh";
    static LH_WinGoldView = "resources/prefabs/views/WinGoldView.lh";

    static LH_Level_Test = "resources/prefabs/level/chapter/Level_Test.lh";
    static LH_Level_10000 = "resources/prefabs/level/chapter/Level_10000.lh";
    static LH_Level_10001 = "resources/prefabs/level/chapter/Level_10001.lh";
    static LH_Level_10002 = "resources/prefabs/level/chapter/Level_10002.lh";

    static EnterLoadList = [
        {url: ConfigPath.JSON_Skin, type: Laya.Loader.JSON},
        {url: ConfigPath.JSON_Dialog, type: Laya.Loader.JSON},

        {url: ConfigPath.LH_Hud, type: Laya.Loader.HIERARCHY},
        {url: ConfigPath.LH_Help, type: Laya.Loader.HIERARCHY},
        {url: ConfigPath.LH_MainView, type: Laya.Loader.HIERARCHY},
        {url: ConfigPath.LH_SkinView, type: Laya.Loader.HIERARCHY},
        {url: ConfigPath.LH_PauseView, type: Laya.Loader.HIERARCHY},
        {url: ConfigPath.LH_WinView, type: Laya.Loader.HIERARCHY},
        {url: ConfigPath.LH_WinGoldView, type: Laya.Loader.HIERARCHY},

        {url: ConfigPath.LH_Level_Test, type: Laya.Loader.HIERARCHY},
        {url: ConfigPath.LH_Level_10000, type: Laya.Loader.HIERARCHY},
        {url: ConfigPath.LH_Level_10001, type: Laya.Loader.HIERARCHY},
        {url: ConfigPath.LH_Level_10002, type: Laya.Loader.HIERARCHY},
        
        {url: ConfigPath.M_Foot, type: Laya.Loader.SOUND},
        {url: ConfigPath.M_Main, type: Laya.Loader.SOUND},
        {url: ConfigPath.M_CatHurt, type: Laya.Loader.SOUND},
        {url: ConfigPath.M_CatJump, type: Laya.Loader.SOUND},
        {url: ConfigPath.M_UI_Click, type: Laya.Loader.SOUND},
        {url: ConfigPath.M_UI_Back, type: Laya.Loader.SOUND},
        {url: ConfigPath.M_UI_Forward, type: Laya.Loader.SOUND},
    ];
}