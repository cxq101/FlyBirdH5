import { ConfigPath } from "./const/ConfigPath";
import { SceneRegUtils } from "./core/UI/SceneRegUtils";
import { ViewRegUtils } from "./core/UI/ViewRegUtils";
import { EViewKey, EViewLayer, ViewLayerZOrder } from "./views/ViewConst";

const { regClass, property } = Laya;

@regClass()
export class Boot extends Laya.Script {
    //declare owner : Laya.Sprite3D;
    declare owner: Laya.Sprite;

    @property(String)
    public text: string = "";

    // 设置语言包
    private initLangPacks(): void {
        Laya.Text.langPacks = Laya.loader.getRes(ConfigPath.Lang);
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
        ViewRegUtils.register(k.Test, l.UI, { showMask: true, extraClick: false, enterAnim: false }, "resources/prefabs/views/Help.lh");

        // ViewRegUtils.register(k.MainUI, l.UI, { showMask: false, extraClick: false, enterAnim: false }, "skins/mainUI/MainUI.scene");

        // ViewRegUtils.register(k.Bag, l.UISystem, { showMask: true, extraClick: true, enterAnim: true }, "skins/bag/BagView.scene");

        // ViewRegUtils.register(k.Login, l.UISystem, { showMask: true, extraClick: false, enterAnim: false }, "skins/login/LoginView.scene");
    }

    private loadRes(): void {
        Laya.loader.load(ConfigPath.EnterLoadList, null, Laya.Handler.create(this, this.onLoadProgress)).then(this.onLoadCompleted);
        Laya.loader.on(Laya.Event.ERROR, this, this.onLoadError);
    }

    private onLoadCompleted(): void {        
        console.log("load completed====");
    }

    private onLoadProgress(progress: number): void {        
        console.log("progress=====", progress);
    }

    private onLoadError(error: string): void {
        console.log("error=====", error);
    }

    private init(): void {
        // 初始化场景层级
        this.buildScene();
        // 初始化场景注册信息
        this.registerAllView();
        // 设置loading挂载节点
        //ViewMgr.ins.setLoadingNode(EViewLayer.UILoading);
        // 设置语言包
        this.initLangPacks();
        this.loadRes();
    }


    //组件被激活后执行，此时所有节点和组件均已创建完毕，此方法只执行一次
    onAwake(): void {
        this.init();
    }

    //组件被启用后执行，例如节点被添加到舞台后
    //onEnable(): void {}

    //组件被禁用时执行，例如从节点从舞台移除后
    //onDisable(): void {}

    //第一次执行update之前执行，只会执行一次
    //onStart(): void {}

    //手动调用节点销毁时执行
    //onDestroy(): void {}

    //每帧更新时执行，尽量不要在这里写大循环逻辑或者使用getComponent方法
    //onUpdate(): void {}

    //每帧更新时执行，在update之后执行，尽量不要在这里写大循环逻辑或者使用getComponent方法
    //onLateUpdate(): void {}

    //鼠标点击后执行。与交互相关的还有onMouseDown等十多个函数，具体请参阅文档。
    //onMouseClick(): void {}
}