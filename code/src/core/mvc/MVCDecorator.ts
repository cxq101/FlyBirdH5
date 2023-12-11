import { TConstructor } from "../base/CoreConst";
import { Controller } from "./Controller";
import { ModelOrControllerCtor, mvc } from "./MVCInstance";
import { Model } from "./Model";

export function register(key: string) {
    return (target: ModelOrControllerCtor) => {
        mvc.register(key, target);
    }
}

export function model(name: string) {
    return (target: any, key: string) => {
        let propertyType = mvc.getCls(name);
        if (propertyType && propertyType.prototype instanceof Model) {
            const model = mvc.getModel(propertyType as TConstructor<Model>);
            if (!model) {
                mvc.setModel(propertyType as TConstructor<Model>);
            }
            target[key] = model;
        } else {
            console.warn(`Invalid usage of ValidateAndInitialize decorator on property ${name}.`);
        }
    }
}

export function controller(name: string) {
    return (target: any, key: string) => {
        let propertyType = mvc.getCls(name);
        if (propertyType && propertyType.prototype instanceof Controller) {
            const ctrl = mvc.getController(propertyType as TConstructor<Controller>);
            if (!ctrl) {
                mvc.setController(propertyType as TConstructor<Controller>);
            }
            target[key] = ctrl;
        } else {
            console.warn(`Invalid usage of ValidateAndInitialize decorator on property ${name}.`);
        }
    }
}
