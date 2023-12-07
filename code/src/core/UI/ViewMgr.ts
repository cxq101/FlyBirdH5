import { Singleton } from "../base/Singleton";
import { BaseView } from "./BaseView";
import { SceneRegUtils } from "./SceneRegUtils";
import { EViewCloseMode, IViewKey, IViewMap } from "./UIInterface";
import { ViewMask } from "./ViewMask";
import { ViewRegUtils } from "./ViewRegUtils";


interface IViewState {
    time: number;// destroy time
    view: BaseView;
}

export class ViewMgr extends Singleton<ViewMgr>() {
    /** 黑色遮罩 */
    // private _mask: ViewMask = new ViewMask();
    // 记录显示中的view
    private _showMap: Map<IViewKey, BaseView> = new Map();
    // 记录隐藏中的view
    private _hideMap: Map<IViewKey, IViewState> = new Map();

    private deleteShowView(key: IViewKey): boolean {
        return this._showMap.delete(key);
    }

    private getShowView(key: IViewKey): BaseView | undefined {
        return this._showMap.get(key);
    }

    private createFromHideMap(key: IViewKey): BaseView | null {
        let map = this._hideMap;
        if (!map.has(key)) return null;
        let stateData = map.get(key);
        map.delete(key);
        return stateData.view;
    }

    open<K extends keyof IViewMap>(key: IViewKey, params?: IViewMap[K]): void {
        let view: BaseView = this.getShowView(key);
        // 当对应界面已经存在 且在显示中 如何处理
        // 还有对于通用的界面 如果有同时存在两个的需求如何处理；
        if (view) {//
            // if (!showItem.openAniOver) return;
            // //当前已经打开了，就直接关闭
            // this.closeUi(winId);
            console.warn(`warning!!!, 尝试打开一个正在开启中的界面。key: ${key}`);
            return;
        }
        //console.log("打开窗口：" + id)
        const regData = ViewRegUtils.get(key);
        if (!regData) {
            console.error("该窗口没有注册哦：" + key);
            return;
        }

        let options = regData.options;
        params = Object.assign({}, options, params);
        // 在缓存列表去查找
        view = this.createFromHideMap(key);
        if (view) {
            //view.options = params;
        } else {
            // const cls = regData.cls;
            // view = new cls(key, params, regData.skin);//创建窗口对象
            // view.on(ViewEvent.LOAD_START, this, this.showLoading);
            // view.on(ViewEvent.LOAD_COMPLETE, this, this.hideLoading);
            // view.on(ViewEvent.CLOSE_SELF, this, this.closeViewSelf, [view]);

            let prefab: Laya.Prefab = Laya.loader.getRes(regData.prefab);
            let sp: Laya.Sprite = Laya.Pool.getItemByCreateFun("TP", prefab.create, prefab);
            view = sp.getComponent(BaseView);
        }

        if (SceneRegUtils.tryAddChild(regData.layer, view.owner as Laya.Sprite)) {
            // options.showMask && this._mask.show(view);
            this._showMap.set(key, view);
        } else {
            console.error("没有对应的父层级", key, regData.layer);
        }
    }

    /**
    * 关闭窗口 直接关闭
    * @param key 窗口名
    * @param arg 参数
    */
    public close(key: IViewKey, mode: EViewCloseMode = EViewCloseMode.HIDE): void {
        let view: BaseView = this.getShowView(key);
        if (view) {
            this.deleteShowView(key);
            let viewOwner = view.owner as Laya.Sprite;
            //options.showMask && this._mask.hide();
            switch (mode) {
                case EViewCloseMode.HIDE:
                    viewOwner.removeSelf();
                    this._hideMap.set(key, { view, time: -1 });
                    break;
                case EViewCloseMode.HIDE_AND_AUTO:
                    viewOwner.removeSelf();
                    let time = Date.now() + 30 * 1000;
                    this._hideMap.set(key, { view, time });
                    break;
                case EViewCloseMode.DESTROY:
                    viewOwner.removeSelf();
                    view.destroy();
                    break;
                default:
                    break;
            }
        } else {
            console.warn("warning!!!, viewMgr try to close invalid view ", key, mode);
        }
    }
}
