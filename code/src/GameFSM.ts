import { t, StateMachine, Callback } from "./core/FSM/StateMatchine";
import { ViewMgr } from "./core/UI/ViewMgr";
import { PromiseEx } from "./utils/PromiseEx";
import { EViewKey } from "./views/ViewConst";

enum GameStates {
    init= "init",
    loading= "loading",
    loaded = "loaded",
    home = "home",
    level = "level",
    pause = "pause",
    win = "win",
}

enum GameEvents {
    load = 100,
    loadComplete,
    enterHome,
    enterLevel,
    win,
    nextLevel,
    pause,
    resume,
    restartLevel,
    backHome,
}

export class GameFSM extends StateMachine<GameStates, GameEvents> {
    private readonly _id = `GameFSM_${Math.floor(Math.random() * 10000)}`;

    constructor(init = GameStates.init) {
        super(init);
        const s = GameStates;
        const e = GameEvents;
        this.addTransitions([
            t(s.init, e.load, s.loading, this.onLoad),
            t(s.loading, e.loadComplete, s.loaded, this.onLoadComplete),

            t(s.loaded, e.enterHome, s.home, this.onEnterHome),

            t(s.home, e.enterLevel, s.level, this.onEnterLevel),

            t(s.level, e.win, s.win, this.onWin),
            t(s.level, e.pause, s.pause, this.onPause),

            t(s.win, e.nextLevel, s.level, this.onNextLevel),

            t(s.pause, e.resume, s.level, this.onResume),
            t(s.pause, e.restartLevel, s.level, this.onRestartLevel),
            t(s.pause, e.backHome, s.home, this.onBackHome),
        ])
    }

    private logState(): void {
        this.logger.log(`${this._id} ${[GameStates[this.getState()]]}`);
    }

    private async onLoad(): Promise<void> {
        this.logger.log("GameFSM==========onLoad");
        // await PromiseEx.delay(3000);
        // this.dispatch(GameEvents.loadComplete);
    }

    private async onEnterHome(): Promise<void> {
        this.logger.log("GameFSM==========onEnterHome");
        ViewMgr.ins.open(EViewKey.MainView);
        // return this.dispatch(GameEvents.breakComplete);
    }

    private async onLoadComplete(): Promise<void> {
        this.logger.log("GameFSM==========onLoadComplete");
        return this.dispatch(GameEvents.enterHome);
    }

    private async onEnterLevel(): Promise<void> {
        this.logger.log("GameFSM==========onEnterLevel");
        // return this.dispatch(GameEvents.breakComplete);
    }

    private async onWin(): Promise<void> {
        this.logger.log("GameFSM==========onWin");
    }
    
    private async onPause(): Promise<void> {
        this.logger.log("GameFSM==========onPause");
    }

    private async onNextLevel(): Promise<void> {
        this.logger.log("GameFSM==========onNextLevel");
    }

    private async onResume(): Promise<void> {
        this.logger.log("GameFSM==========onResume");
    }
    
    private async onRestartLevel(): Promise<void> {
        this.logger.log("GameFSM==========onRestartLevel");
    }

    private async onBackHome(): Promise<void> {
        this.logger.log("GameFSM==========onBackHome");
    }

    load(): void {
        this.dispatch(GameEvents.load);
    }
    loadComplete(): void {
        this.dispatch(GameEvents.loadComplete);
    }
    enterHome(): void {
        this.dispatch(GameEvents.enterHome);
    }
}