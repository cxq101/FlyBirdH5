const { regClass } = Laya;
import { Door } from "../Main";
import { RuntimeScriptBase } from "./RuntimeScript.generated";

@regClass()
export class RuntimeScript extends RuntimeScriptBase {
    private door: Door;

    onEnable(): void {
        this.door = new Door(10086);
        this.tab.selectHandler = Laya.Handler.create(this, this.onTabSelected, null, false);
        this.timerLoop(10, this, this.changeStateText);
    }

    private onTabSelected(index: number): void {
        console.log("onTab selected========", index);
        switch (index) {
            case 0:
                this.door.open();
                break;
            case 1:
                this.door.close();
                break;
            case 2:
                this.door.lock();
                break;
            case 3:
                this.door.unlock(10086);
                break;
            case 4:
                this.door.break();
                break;
            default:
                break;
        }
    }

    private changeStateText(): void {
        this.txtState.text = this.door.getState();
    }

}