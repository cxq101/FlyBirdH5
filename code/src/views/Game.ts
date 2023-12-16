/**
 * author: cxq
 * time: 2023/12/14 19:19:50
 * desc: 
 */

import { Boot } from "../Boot";
import { GameEvents, GameFSM } from "../GameFSM";
import { ConfigPath } from "../const/ConfigPath";
import { SceneRegUtils } from "../core/UI/SceneRegUtils";
import { ViewMgr } from "../core/UI/ViewMgr";
import { ViewRegUtils } from "../core/UI/ViewRegUtils";
import { Singleton } from "../core/base/Singleton";
import { PromiseEx } from "../utils/PromiseEx";
import { ViewLayerZOrder, EViewKey, EViewLayer } from "./ViewConst";

export class Game extends Singleton<Game>() {
    private _fsm: GameFSM;
    private _boot: Boot;

    public init(boot: Boot): void {
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
        await PromiseEx.delay(200);

        // 初始化场景层级
        this.buildScene();
        this._boot.setLoading({ desc: "100001", value: 0.10 });
        await PromiseEx.delay(200);

        // 初始化场景注册信息
        this.registerAllView();
        this._boot.setLoading({ desc: "100002", value: 0.15 });
        await PromiseEx.delay(200);

        // 设置加载Common资源
        this._boot.setLoading({ desc: "100004" });
        this.loadRes();
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
        ViewRegUtils.register(k.SkinView, l.UI, { showMask: true, extraClick: true, enterAnim: false }, ConfigPath.LH_SkinView);
        ViewRegUtils.register(k.HelpView, l.UI, { showMask: true, extraClick: false, enterAnim: false }, ConfigPath.LH_Help);
        ViewRegUtils.register(k.HudView, l.UI, { showMask: false, extraClick: false, enterAnim: false }, ConfigPath.LH_Hud);
    }

    private loadRes(): void {
        Laya.loader.on(Laya.Event.ERROR, this, this.onLoadError);
        Laya.loader.load(ConfigPath.EnterLoadList, null, Laya.Handler.create(this, this.onLoadProgress)).then(() => {
            this.onLoadCompleted();
        })
    }

    private onLoadCompleted(): void {
        this._boot.setLoading({ value: 0.95 });

        PromiseEx.delay(2000).then(() => {
            this._boot.setLoading({ desc: "100005", value:  1.0 });

            Laya.Scene.hideLoadingPage(0);
            this._boot.levelLoader.createBackgroundRoot();
            Laya.timer.once(1000, this, () => {
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
        ViewMgr.ins.open(EViewKey.MainView);
    }

    private onEnterLevelHandler(): void {
        ViewMgr.ins.close(EViewKey.MainView);
        this._boot.levelLoader.createTestLevel();
        ViewMgr.ins.close(EViewKey.MainView);

        // 1.先弹出遮罩层；
        
        // 2.创建角色；
        // 3.创建关卡障碍物；不会全部创建 根据当前位置创建；是否要引入tilemap？
        // 4.创建item道具
        // 5.隐层遮罩层；

        // 开始
    }

    private onWinHandler(): void {

    }

    private onPauseHandler(): void {

    }

    private onNextLevelHandler(): void {

    }

    private onResumeHandler(): void {

    }

    private onRestartLevelHandler(): void {

    }

    private onBackHomeHandler(): void {

    }

    public enterLevel(): void {
        this._fsm.dispatch(GameEvents.enterLevel);
    }
}