/**
 * author: cxq
 * time: 2023/01/18 19:57:01
 * desc: 
 */
export class SceneRegUtils {
    private static _root: Laya.Stage;
    private static _map: Map<string, Laya.Sprite> = new Map();

    static get root(): Laya.Stage {
        if (!this._root && Laya.stage) {
            this._root = Laya.stage;
            this._root.on(Laya.Event.RESIZE, this, this.onResize);
        }
        return this._root;
    }

    static get map(): Map<string, Laya.Sprite> {
        return this._map;
    }

    private static onResize(): void {
        const w = Laya.stage.width;
        const h = Laya.stage.height;
        this.map.forEach((view) => {
            view.size(w, h);
        })
    }

    static add(key: string, node: Laya.Sprite, zOrder: number): void {
        if (!key || !node || node.destroyed) {
            // invalid!!!
            return;
        }
        if (this._map.has(key)) {
            // has!!!
            return;
        }
        node.name = key;
        let root = this.root;
        node.zOrder = zOrder;
        const w = Laya.stage.width;
        const h = Laya.stage.height;
        node.size(w, h);
        node.mouseThrough = true;
        root.addChild(node);
        this._map.set(key, node);
    }

    static tryAddChild(key: string, child: Laya.Sprite): boolean {
        let map = this.map;
        if (map.has(key)) {
            let node = map.get(key);
            node.addChild(child);
            return true;
        }
        return false;
    }
}

