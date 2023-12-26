import { Model } from "./Model";
import { Controller } from "./Controller";
import { TConstructor } from "../base/CoreConst";

export type MOC = Model | Controller;

export class MVCDecorator {
    static _classMap_: Map<string, TConstructor<MOC>> = new Map();
    static _instanceMap_: Map<string, MOC> = new Map();

    static reg(cls: any): void {
        const clsName = (cls as any).name;
        if (!(cls.prototype instanceof Controller) && !(cls.prototype instanceof Model)) {
            console.warn("mvc reg warning!!! register a class not model or ctrl", clsName, cls);
            return;
        }
        if (MVCDecorator._classMap_.has(clsName)) {
            console.warn("mvc reg warning!!! repeat register", clsName, cls);
            return;
        }
        MVCDecorator._classMap_.set(clsName, cls);
    }
    
    static prop(cls: Controller | Model): PropertyDecorator {
        return (target: any, key: PropertyKey) => {
            const getter = function () {
                const clsName = (cls as any).name;
                if (!MVCDecorator._classMap_.has(clsName)) {
                    console.warn("mvc prop warning!!! try to get a model no register", clsName, key, cls);
                    return;
                }
                const cacheClass = MVCDecorator._classMap_.get(clsName);
                let instance = MVCDecorator._instanceMap_.get(clsName);
                if (!MVCDecorator._instanceMap_.has(clsName)) {
                    instance = new cacheClass();
                    MVCDecorator._instanceMap_.set(clsName, instance);
                }
                return instance;
            };
          
            const setter = function () {
                const clsName = (cls as any).name;
                console.warn("mvc prop warning!!! try to set a prop.", clsName, key, cls);
            };
          
            // Redefine the property with the new getter and setter
            Object.defineProperty(target, key, {
              get: getter,
              set: setter,
              enumerable: true,
              configurable: true,
            });
        }
    }

    // todo 
    private static model_handler(cls: Model, event: string) {
        return (target: Object, propertyKey: string | symbol, descriptor: any) => {
            console.log("model_handler========", target, propertyKey, descriptor);
        }
    }
}
