const { regClass } = Laya;
import { GameFSM } from "../GameFSM";
import { ViewMgr } from "../core/UI/ViewMgr";
import { RuntimeScriptBase } from "./RuntimeScript.generated";
import { EViewKey } from "./ViewConst";

@regClass()
export class RuntimeScript extends RuntimeScriptBase {
    private gameFSM: GameFSM;

    onEnable(): void {
        this.gameFSM = new GameFSM(10086);
        this.tab.selectHandler = Laya.Handler.create(this, this.onTabSelected, null, false);
        this.timerLoop(10, this, this.changeStateText);
    }

    private onTabSelected(index: number): void {
        // console.log("onTab selected========", index);
        // switch (index) {
        //     case 0:
        //         this.gameFSM.open();
        //         break;
        //     case 1:
        //         this.gameFSM.close();
        //         break;
        //     case 2:
        //         this.gameFSM.lock();
        //         break;
        //     case 3:
        //         this.gameFSM.unlock(10086);
        //         break;
        //     case 4:
        //         this.gameFSM.break();
        //         break;
        //     default:
        //         break;
        // }
        ViewMgr.ins.open(EViewKey.Test);
    }

    private changeStateText(): void {
        this.txtState.text = this.gameFSM.getState();
    }

}