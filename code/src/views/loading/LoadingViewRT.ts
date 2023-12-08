const { regClass } = Laya;
import { StringUtils } from "../../utils/StringUtils";
import { LoadingViewRTBase } from "./LoadingViewRT.generated";

@regClass()
export class LoadingViewRT extends LoadingViewRTBase {
    
    private _desc : string = "100000";
    private _value : number;

    public get value() : number {
        return this._value;
    }
    
    public set value(v : number) {
        this._value = v;
        this.progress.value = v;
        this.lblProgress.text = `${StringUtils.lang(this.desc)}...${StringUtils.toPercent(v)}`;
    }
    
    public get desc() : string {
        return this._desc;
    }

    public set desc(v : string) {
        this._desc = v;
    }
    
}