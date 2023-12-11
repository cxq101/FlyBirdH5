import { TConstructor } from "../base/CoreConst";
import { Singleton } from "../base/Singleton";
import { Controller } from "./Controller";
import { Model } from "./Model";

export type ModelOrControllerCtor = TConstructor<Model> | TConstructor<Controller>;

class MVCInstance extends Singleton<MVCInstance>() {
    private _clsMap: Map<string, ModelOrControllerCtor> = new Map();
    
    private _modelMap: Map<TConstructor<Model>, Model> = new Map();

    private _controllerMap: Map<TConstructor<Controller>, Controller> = new Map();

    register(key: string, cls: ModelOrControllerCtor): void {
        if (this._clsMap.has(key)) {
            console.warn("mvc warning!!! this model has exist", key, cls.name);
            return;
        };
        this._clsMap.set(key, cls);
    }   

    getCls(key: string): ModelOrControllerCtor {
        if (!this._clsMap.has(key)) {
            console.warn("mvc warning!!! this key is not exist", key);
            return;
        }
        return this._clsMap.get(key);
    }
    

    setModel(cls: TConstructor<Model>): void {
        if (this._modelMap.has(cls)) {
            console.warn("mvc warning!!! this model has exist", cls.name);
            return;
        };
        this._modelMap.set(cls, new cls());
    }

    getModel(cls: TConstructor<Model>): Model {
        return this._modelMap.get(cls);
    }

    setController(cls: TConstructor<Controller>): void {
        if (this._controllerMap.has(cls)) {
            console.warn("mvc warning!!! this ctrl has exist", cls.name);
            return;
        };
        this._controllerMap.set(cls, new cls());
    }

    getController(cls: TConstructor<Controller>): Controller {
        return this._controllerMap.get(cls);
    }
}
export const mvc = MVCInstance.ins;