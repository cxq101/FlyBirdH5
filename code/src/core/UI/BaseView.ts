import { IViewKey } from "./UIInterface";

const { regClass, property } = Laya;

@regClass()
export class BaseView extends Laya.Script {
    private _view: Laya.Sprite;
    public key: IViewKey;

    onAwake(): void {
        this._view = this.owner as Laya.Sprite;    
    }

    initialize(): void {

    }   

    show(): void {
        this._view.visible = true;
    }

    hide(): void {
        this._view.visible = false;
    }
}