import { TConstructor } from "../base/CoreConst";
import { Singleton } from "../base/Singleton";
import { Controller } from "./Controller";
import { Model } from "./Model";

class MVCInstance extends Singleton<MVCInstance>() {
    private _modelMap: Map<TConstructor<Model>, Model> = new Map();

    private _controllerMap: Map<TConstructor<Controller>, Controller> = new Map();

    setModel(cls: TConstructor<Model>): void {
        if (this._modelMap.has(cls)) {
            console.warn("mvc warning!!! this model has exist", cls.name);
            return;
        };
        this._modelMap.set(cls, new cls());
    }

    setController(cls: TConstructor<Controller>): void {
        if (this._controllerMap.has(cls)) {
            console.warn("mvc warning!!! this ctrl has exist", cls.name);
            return;
        };
        this._controllerMap.set(cls, new cls());
    }
    // get viewMgr(): ViewMgr {
    //     return ViewMgr.ins;
    // }
}
export const mvc = MVCInstance.ins;