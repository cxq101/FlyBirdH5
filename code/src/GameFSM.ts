import { t, StateMachine } from "./core/FSM/StateMatchine";

export enum GameStates {
    init= "init",
    loading= "loading",
    loaded = "loaded",
    home = "home",
    level = "level",
    pause = "pause",
    win = "win",
}

export enum GameEvents {
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

    public onLoadHandler: Laya.Handler;
    public onLoadCompleteHandler: Laya.Handler;
    public onEnterHomeHandler: Laya.Handler;
    public onEnterLevelHandler: Laya.Handler;
    public onWinHandler: Laya.Handler;
    public onPauseHandler: Laya.Handler;
    public onNextLevelHandler: Laya.Handler;
    public onResumeHandler: Laya.Handler;
    public onRestartLevelHandler: Laya.Handler;
    public onBackHomeHandler: Laya.Handler;

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
        this.onLoadHandler && this.onLoadHandler.run();
    }

    private async onEnterHome(): Promise<void> {
        this.onEnterHomeHandler && this.onEnterHomeHandler.run();
    }

    private async onLoadComplete(): Promise<void> {
        this.onLoadCompleteHandler && this.onLoadCompleteHandler.run();
    }

    private async onEnterLevel(levelId: number): Promise<void> {
        this.onEnterLevelHandler && this.onEnterLevelHandler.runWith(levelId);
    }

    private async onWin(): Promise<void> {
        this.onWinHandler && this.onWinHandler.run();
    }
    
    private async onPause(): Promise<void> {
        this.onPauseHandler && this.onPauseHandler.run();
    }

    private async onNextLevel(levelId: number): Promise<void> {
        this.onNextLevelHandler && this.onNextLevelHandler.runWith(levelId);
    }

    private async onResume(): Promise<void> {
        this.onResumeHandler && this.onResumeHandler.run();
    }
    
    private async onRestartLevel(): Promise<void> {
        this.onRestartLevelHandler && this.onRestartLevelHandler.run();
    }

    private async onBackHome(): Promise<void> {
        this.onBackHomeHandler && this.onBackHomeHandler.run();
    }
}