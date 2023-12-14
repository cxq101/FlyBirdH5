import { IViewKey, IViewLayer, IViewParam, IViewReg } from "./UIInterface";

export class ViewRegUtils {
    private static _map: Map<IViewKey, IViewReg> = new Map();

    static register(key: IViewKey, layer: IViewLayer, options: IViewParam = {}, prefab: string = null) {
        if (!layer) {
            console.warn("warning!!! register parent is null", key, layer);
            return;
        }
        if (this._map.has(key)) {
            console.warn("warning!!! repeat register id:", key);
            return;
        }

        this._map.set(key, { key, parent: layer, options, prefab });
    }

    static get(id: IViewKey): IViewReg {
        return this._map.get(id);
    }

    static has(id: IViewKey): boolean {
        return this._map.has(id);
    }
}
