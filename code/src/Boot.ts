import { LevelLoader } from "./LevelLoader";
import { Game } from "./views/Game";
import { LoadingViewRT } from "./views/loading/LoadingViewRT";

const { regClass, property } = Laya;

@regClass()
export class Boot extends Laya.Script {

    declare owner: Laya.Sprite;

    @property({ type: Laya.Prefab })
    private loadingPrefab: Laya.Prefab;
    @property({ type: LevelLoader })
    public levelLoader: LevelLoader;

    private _loadingNode: LoadingViewRT;

    //组件被激活后执行，此时所有节点和组件均已创建完毕，此方法只执行一次
    onAwake(): void {
        let node = this.loadingPrefab.create() as LoadingViewRT;
        this._loadingNode = node;
        node.value = 0;
        Laya.Scene.setLoadingPage(node);
        Laya.Scene.showLoadingPage();
        Game.ins.init(this);
    }

    setLoading(data: { desc?: string, value?: number }): void {
        data.desc != null && (this._loadingNode.desc = data.desc);
        data.value != null && (this._loadingNode.value = data.value);
    }
}

