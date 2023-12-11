import { GameFSM } from "./GameFSM";
import { ConfigPath } from "./const/ConfigPath";
import { SceneRegUtils } from "./core/UI/SceneRegUtils";
import { ViewRegUtils } from "./core/UI/ViewRegUtils";
import { Controller } from "./core/mvc/Controller";
import { mvc } from "./core/mvc/MVCInstance";
import { PromiseEx } from "./utils/PromiseEx";
import { EViewKey, EViewLayer, ViewLayerZOrder } from "./views/ViewConst";
import { LoadingViewRT } from "./views/loading/LoadingViewRT";
import { SkinController } from "./views/skin/SkinController";
import { SkinModel } from "./views/skin/SkinModel";

const { regClass, property } = Laya;

@regClass()
export class Boot extends Laya.Script {
    declare owner: Laya.Sprite;

    @property({ type: Laya.Prefab })
    private loadingPrefab: Laya.Prefab;
    private loadingNode: LoadingViewRT;

    private gameFSM: GameFSM;

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
        ViewRegUtils.register(k.HelpView, l.UI, { showMask: true, extraClick: false, enterAnim: false }, ConfigPath.LH_Help);
        ViewRegUtils.register(k.MainView, l.UI, { showMask: true, extraClick: false, enterAnim: false }, ConfigPath.LH_MainView);
        ViewRegUtils.register(k.SkinView, l.UI, { showMask: true, extraClick: false, enterAnim: false }, ConfigPath.LH_SkinView);
        // ViewRegUtils.register(k.Bag, l.UISystem, { showMask: true, extraClick: true, enterAnim: true }, "skins/bag/BagView.scene");
        // ViewRegUtils.register(k.Login, l.UISystem, { showMask: true, extraClick: false, enterAnim: false }, "skins/login/LoginView.scene");
    }

    private loadRes(): void {
        Laya.loader.on(Laya.Event.ERROR, this, this.onLoadError);
        Laya.loader.load(ConfigPath.EnterLoadList, null, Laya.Handler.create(this, this.onLoadProgress)).then(() => {
            this.onLoadCompleted();
        })
    }

    private onLoadCompleted(): void {
        console.log("load completed====");
        this.loadingNode.value = 0.95;
        PromiseEx.delay(2000).then(() => {
            this.loadingNode.desc = "100005";
            this.loadingNode.value = 1.0;
            Laya.Scene.hideLoadingPage(0);
            this.gameFSM.loadComplete();
        });
    }

    private onLoadProgress(progress: number): void {
        console.log("progress=====", progress);
    }

    private onLoadError(error: string): void {
        console.log("error=====", error);
    }

    //组件被激活后执行，此时所有节点和组件均已创建完毕，此方法只执行一次
    onAwake(): void {
        let t0 = new SkinModel();
        let t1 = new SkinController();
        console.log(t0, t1);

        this.gameFSM = new GameFSM();
        let node = this.loadingPrefab.create() as LoadingViewRT;
        this.loadingNode = node;
        node.value = 0;
        Laya.Scene.setLoadingPage(node);
        Laya.Scene.showLoadingPage();
        this.gameFSM.load();
        this.init();
    }

    private async init() {
        // 设置语言包
        await this.initLangPacks();
        this.loadingNode.desc = "100003";
        this.loadingNode.value = 0.05;
        await PromiseEx.delay(200);

        // 初始化场景层级
        this.buildScene();
        this.loadingNode.desc = "100001";
        this.loadingNode.value = 0.10;
        await PromiseEx.delay(200);

        // 初始化场景注册信息
        this.registerAllView();
        this.loadingNode.desc = "100002";
        this.loadingNode.value = 0.15;
        await PromiseEx.delay(200);

        // 设置加载Common资源
        this.loadingNode.desc = "100004";
        this.loadRes();
    }
}




function classD(target: any) {
    console.log("this classD=====", target.name);
}

function propD(target: any, key: string) {
    console.log("this propD=====", target.name, key);
}

@classD
class A {
    @propD
    propA: string;
}

@classD
class B {
    @propD
    propB: string;
}