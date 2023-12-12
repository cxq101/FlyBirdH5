import { Controller } from "../../core/mvc/Controller";
import { model, register } from "../../core/mvc/MVCDecorator";
import { SkinModel } from "./SkinModel";

/**
 * author: cxq
 * time: 2023/12/09 19:32:14
 * desc: 
 */
export class SkinController extends Controller {
    private static _ins: SkinController;
    public static get ins(): SkinController {
        if (this._ins == null) {
            this._ins = new SkinController();
        }
        return this._ins;
    }

    private model: SkinModel;
    
    private constructor() {
        super();
        this.model = SkinModel.ins;
    }

    unlcok(id: string): void {
        this.model.unlock(id);
    }

    adventure(id: string): void {
        this.model.adventure(id);
    }
}