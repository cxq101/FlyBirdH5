/**
 * author: cxq
 * time: 2023/12/14 19:19:50
 * desc: 
 */

import { Boot } from "../Boot";
import { GameEvents, GameFSM, GameStates } from "../GameFSM";
import { ConfigPath } from "../const/ConfigPath";
import { SceneRegUtils } from "../core/UI/SceneRegUtils";
import { ViewMgr } from "../core/UI/ViewMgr";
import { ViewRegUtils } from "../core/UI/ViewRegUtils";
import { Singleton } from "../core/base/Singleton";
import { BackgroundRoot } from "../level/BackgroundRoot";
import { Level } from "../level/Level";
import { LevelLoadMask } from "../level/LevelLoadMask";
import { PromiseEx } from "../utils/PromiseEx";
import { ViewLayerZOrder, EViewKey, EViewLayer } from "./ViewConst";
import { ELevelConst } from "./level/LevelConst";
import { LevelModel } from "./level/LevelModel";

export class Game extends Singleton<Game>() {
    private _fsm: GameFSM;
    private _boot: Boot;
    private _level: Level;
    private _levelLoadMask: LevelLoadMask;
    private _backgroundRoot: BackgroundRoot;

    init(boot: Boot): void {
        this._boot = boot;
        
        this._fsm = new GameFSM();
        this._fsm.onLoadHandler = new Laya.Handler(this, this.onLoadHandler, null, false);
        this._fsm.onLoadCompleteHandler = new Laya.Handler(this, this.onLoadCompleteHandler, null, false);
        this._fsm.onEnterHomeHandler = new Laya.Handler(this, this.onEnterHomeHandler, null, false);
        this._fsm.onEnterLevelHandler = new Laya.Handler(this, this.onEnterLevelHandler, null, false);
        this._fsm.onWinHandler = new Laya.Handler(this, this.onWinHandler, null, false);
        this._fsm.onPauseHandler = new Laya.Handler(this, this.onPauseHandler, null, false);
        this._fsm.onNextLevelHandler = new Laya.Handler(this, this.onNextLevelHandler, null, false);
        this._fsm.onResumeHandler = new Laya.Handler(this, this.onResumeHandler, null, false);
        this._fsm.onRestartLevelHandler = new Laya.Handler(this, this.onRestartLevelHandler, null, false);
        this._fsm.onBackHomeHandler = new Laya.Handler(this, this.onBackHomeHandler, null, false);

        this._fsm.dispatch(GameEvents.load);
    }

    private async sequeueInit() {
        // 设置语言包
        await this.initLangPacks();
        this._boot.setLoading({ desc: "100003", value: 0.05 });
        await PromiseEx.delay(20);

        // 初始化场景层级
        this.buildScene();
        this._boot.setLoading({ desc: "100001", value: 0.10 });
        await PromiseEx.delay(20);

        // 初始化场景注册信息
        this.registerAllView();
        this._boot.setLoading({ desc: "100002", value: 0.15 });
        await PromiseEx.delay(20);

        // 设置加载Common资源
        this._boot.setLoading({ desc: "100004" });
        this.loadRes();

        Laya.SoundManager.setMusicVolume(0.5);
    }

    // 设置语言包
    private async initLangPacks(): Promise<any> {
        return Laya.loader.load(ConfigPath.JSON_Lang).then((result) => {
            Laya.Text.langPacks = result.data;
        })
    }

    // 初始化场景层级
    private buildScene(): void {
        let orders = ViewLayerZOrder;
        orders.forEach((item) => {
            const [layer, zOrder] = item;
            SceneRegUtils.add(layer, new Laya.Sprite(), zOrder);
        });
    }

    // 初始化场景注册信息
    private registerAllView(): void {
        const k = EViewKey, l = EViewLayer;
        ViewRegUtils.register(k.MainView, l.UI, { showMask: false, extraClick: false, enterAnim: false }, ConfigPath.LH_MainView);
        ViewRegUtils.register(k.SkinView, l.UI, { showMask: true, extraClick: false, enterAnim: false }, ConfigPath.LH_SkinView);
        ViewRegUtils.register(k.HelpView, l.UI, { showMask: true, extraClick: false, enterAnim: false }, ConfigPath.LH_Help);
        ViewRegUtils.register(k.HudView, l.UI, { showMask: false, extraClick: false, enterAnim: false }, ConfigPath.LH_Hud);
        ViewRegUtils.register(k.PauseView, l.UI, { showMask: true, extraClick: false, enterAnim: false }, ConfigPath.LH_PauseView);
        ViewRegUtils.register(k.WinView, l.UI, { showMask: true, extraClick: false, enterAnim: false }, ConfigPath.LH_WinView);
        ViewRegUtils.register(k.WinGoldView, l.UI, { showMask: true, extraClick: false, enterAnim: false }, ConfigPath.LH_WinGoldView);
    }

    private loadRes(): void {
        Laya.loader.on(Laya.Event.ERROR, this, this.onLoadError);
        Laya.loader.load(ConfigPath.EnterLoadList, null, Laya.Handler.create(this, this.onLoadProgress)).then(() => {
            this.onLoadCompleted();
        })
    }

    private openMainView(): void {
        this._backgroundRoot.setSkin(0);
        this._levelLoadMask.ungroup(Laya.Handler.create(this, () => {
            ViewMgr.ins.open(EViewKey.MainView);
            Laya.SoundManager.playMusic(ConfigPath.M_Main);
        }));
    }

    private onLoadCompleted(): void {
        this._boot.setLoading({ value: 0.95 });

        PromiseEx.delay(20).then(() => {
            this._boot.setLoading({ desc: "100005", value:  1.0 });

            Laya.Scene.hideLoadingPage(0);
            this._levelLoadMask = this._boot.levelLoader.createLoadMask();
            this._backgroundRoot = this._boot.levelLoader.createBackgroundRoot();
            this._backgroundRoot.enterAnim();
            Laya.timer.once(200, this, () => {
                this._fsm.dispatch(GameEvents.loadComplete);
            })
        });
    }

    private onLoadProgress(progress: number): void {
        console.log("progress=====", progress);
    }

    private onLoadError(error: string): void {
        console.log("error=====", error);
    }
    
    private onLoadHandler(): void {
        this.sequeueInit();
    }

    private onLoadCompleteHandler(): void {
        this._fsm.dispatch(GameEvents.enterHome);
    }

    private onEnterHomeHandler(): void {
        this.openMainView();
    }

    private onEnterLevelHandler(levelId: number): void {
        this._levelLoadMask.group(Laya.Handler.create(this, this.onEnterLevelGroupHandler, [levelId]));
    }

    private onEnterLevelGroupHandler(levelId: number): void {
        ViewMgr.ins.close(EViewKey.MainView);
        this._backgroundRoot.autoMove = false;
        this._backgroundRoot.randomSkin();
        this._level = this._boot.levelLoader.loadLevel(levelId, this._backgroundRoot);
        ViewMgr.ins.open(EViewKey.HudView);
        this._levelLoadMask.ungroup();
        // Laya.SoundManager.playMusic(ConfigPath.M_Level);
    }

    private onWinHandler(): void {
        ViewMgr.ins.close(EViewKey.HudView);  
        if (LevelModel.ins.isSecondLevel()) {
            ViewMgr.ins.open(EViewKey.WinGoldView);   
        } else {
            ViewMgr.ins.open(EViewKey.WinView);   
        }
    }

    private onPauseHandler(): void {
        ViewMgr.ins.close(EViewKey.HudView);   
        ViewMgr.ins.open(EViewKey.PauseView);   
    }

    private onNextLevelHandler(): void {
        this._levelLoadMask.group(Laya.Handler.create(this, this.onNextLevelGroupHandler));
    }

    private onNextLevelGroupHandler(): void {
        const levelId = ELevelConst.Level_10002;
        this._level.reEnterLevel(levelId);
        ViewMgr.ins.close(EViewKey.WinView);
        ViewMgr.ins.open(EViewKey.HudView);
        this._levelLoadMask.ungroup();
        // Laya.SoundManager.playMusic(ConfigPath.M_Level);
    }

    private onResumeHandler(): void {
        ViewMgr.ins.open(EViewKey.HudView);   
        ViewMgr.ins.close(EViewKey.PauseView);   
    }

    private onRestartLevelHandler(): void {
        this._levelLoadMask.group(Laya.Handler.create(this, this.onRestartLevelGroupHandler));
    }

    private onRestartLevelGroupHandler(): void {
        this._levelLoadMask.ungroup();
        ViewMgr.ins.close(EViewKey.PauseView);   
        ViewMgr.ins.close(EViewKey.WinGoldView);
        this._level.restart();
        ViewMgr.ins.open(EViewKey.HudView);
        // Laya.SoundManager.playMusic(ConfigPath.M_Level);
    }

    private onBackHomeHandler(): void {
        this._levelLoadMask.group(Laya.Handler.create(this, this.onBackHomeGroupHandler));
    }

    private onBackHomeGroupHandler(): void {
        this._boot.levelLoader.unloadLevel(this._level);
        this._level = null;
        ViewMgr.ins.close(EViewKey.PauseView);
        ViewMgr.ins.close(EViewKey.WinGoldView);
        this.openMainView();
    }

    enterLevel(levelId: number): void {
        this._fsm.dispatch(GameEvents.enterLevel, levelId);
    }
    
    pause(): void {
        this._fsm.dispatch(GameEvents.pause, "param");
    }

    resume(): void {
        this._fsm.dispatch(GameEvents.resume);
    }

    restartLevel(): void {
        this._fsm.dispatch(GameEvents.restartLevel);
    }

    backHome(): void {
        this._fsm.dispatch(GameEvents.backHome);
    }

    nextLevel(): void {
        this._fsm.dispatch(GameEvents.nextLevel);
    }

    win(): void {
        this._fsm.dispatch(GameEvents.win);
    }

    isWin(): boolean {
        return this._fsm.getState() === GameStates.win;
    }

    scrollTo(p: number): void {
        this._level.scrollTo(p);
    }
}