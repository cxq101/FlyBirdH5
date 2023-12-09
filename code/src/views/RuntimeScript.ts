const { regClass } = Laya;
import { GameFSM } from "../GameFSM";
import { ViewMgr } from "../core/UI/ViewMgr";
import { RuntimeScriptBase } from "./RuntimeScript.generated";
import { EViewKey } from "./ViewConst";

@regClass()
export class RuntimeScript extends RuntimeScriptBase {

    onEnable(): void {
        this.tab.selectHandler = Laya.Handler.create(this, this.onTabSelected, null, false);
        this.timerLoop(10, this, this.changeStateText);
    }

    private onTabSelected(index: number): void {
        ViewMgr.ins.open(EViewKey.HelpView);
    }

    private changeStateText(): void {
    }

}